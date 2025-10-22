#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de tabla de contenidos HTML para CC:2022
Genera automáticamente la tabla HTML a partir del archivo de texto
"""

import re

def extract_component_id(text):
    """Extrae el identificador del componente (ej: FAU_ARP, FCS_CKM.1) del texto"""
    # Busca patrones como FAU_ARP, FCO_NRO.1, FCS_CKM, etc.
    pattern = r'\b([A-Z]{3}_[A-Z]{3,4}(?:\.\d+)?)\b'
    matches = re.findall(pattern, text)
    if matches:
        # Retorna todos los identificadores únicos encontrados
        return ', '.join(sorted(set(matches), key=matches.index))
    return ''

def get_class_from_section(section):
    """Determina la clase a partir del número de sección"""
    section_num = int(section.split('.')[0])
    class_map = {
        8: 'FAU',
        9: 'FCO',
        10: 'FCS',
        11: 'FDP',
        12: 'FIA',
        13: 'FMT',
        14: 'FPR',
        15: 'FPT',
        16: 'FRU',
        17: 'FTA',
        18: 'FTP'
    }
    return class_map.get(section_num, '')

def get_class_name(class_code):
    """Obtiene el nombre completo de la clase"""
    class_names = {
        'FAU': 'Security audit',
        'FCO': 'Communication',
        'FCS': 'Cryptographic support',
        'FDP': 'User data protection',
        'FIA': 'Identification and authentication',
        'FMT': 'Security management',
        'FPR': 'Privacy',
        'FPT': 'Protection of the TSF',
        'FRU': 'Resource utilization',
        'FTA': 'TOE access',
        'FTP': 'Trusted path/channels'
    }
    return class_names.get(class_code, '')

def get_indent_level(section):
    """Determina el nivel de indentación basado en la profundidad de la sección"""
    depth = section.count('.')
    return f'level-{min(depth, 3)}'

def is_class_row(section, description):
    """Determina si la fila es una clase principal"""
    return '.' not in section and 'Class' in description

def parse_toc_file(filename):
    """Lee y parsea el archivo de tabla de contenidos"""
    entries = []
    
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('Contents') or line.startswith('Page') or line.startswith('November'):
                continue
            
            # Busca líneas que comienzan con un número (sección)
            match = re.match(r'^(\d+(?:\.\d+)*)\s+(.+?)(?:\.{2,}.*)?$', line)
            if match:
                section = match.group(1)
                description = match.group(2).strip()
                
                # Solo procesar secciones del 8 al 18
                section_num = int(section.split('.')[0])
                if 8 <= section_num <= 18:
                    entries.append({
                        'section': section,
                        'description': description
                    })
    
    return entries

def generate_html_rows(entries):
    """Genera las filas HTML a partir de las entradas"""
    rows = []
    current_class = None
    
    for entry in entries:
        section = entry['section']
        description = entry['description']
        
        # Extraer el identificador del componente
        component_id = extract_component_id(description)
        
        # Limpiar la descripción (remover el identificador si está al principio)
        clean_description = re.sub(r'^[A-Z]{3}_[A-Z]{3,4}(?:\.\d+)?\s+', '', description)
        clean_description = re.sub(r'\([A-Z]{3}_[A-Z]{3,4}\)\s*', '', clean_description)
        
        # Determinar la clase
        class_code = get_class_from_section(section)
        
        # Verificar si es una fila de clase principal
        if is_class_row(section, description):
            if current_class != class_code:
                current_class = class_code
                rows.append(f'''    <tr class="class-row" data-class="{class_code}">
        <td class="section-id">{section}</td>
        <td class="component-id"></td>
        <td class="description level-8">{clean_description}</td>
    </tr>''')
        else:
            # Fila regular
            indent_class = get_indent_level(section)
            rows.append(f'''    <tr data-class="{class_code}">
        <td class="section-id">{section}</td>
        <td class="component-id">{component_id}</td>
        <td class="description {indent_class}">{clean_description}</td>
    </tr>''')
    
    return '\n'.join(rows)

def generate_complete_html(txt_file, output_file):
    """Genera el archivo HTML completo"""
    
    # Parsear el archivo de texto
    entries = parse_toc_file(txt_file)
    
    # Generar las filas HTML
    table_rows = generate_html_rows(entries)
    
    # Plantilla HTML completa
    html_template = '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CC:2022 - Tabla de Contenidos</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }

        .controls {
            padding: 20px 30px;
            background: #f8f9fa;
            border-bottom: 2px solid #e9ecef;
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            align-items: center;
        }

        .search-box {
            flex: 1;
            min-width: 250px;
        }

        .search-box input {
            width: 100%;
            padding: 12px 20px;
            border: 2px solid #ddd;
            border-radius: 25px;
            font-size: 1em;
            transition: all 0.3s;
        }

        .search-box input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filter-group {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .filter-group label {
            font-weight: 600;
            color: #2c3e50;
        }

        .filter-group select {
            padding: 10px 15px;
            border: 2px solid #ddd;
            border-radius: 20px;
            font-size: 0.95em;
            background: white;
            cursor: pointer;
            transition: all 0.3s;
        }

        .filter-group select:hover {
            border-color: #667eea;
        }

        .filter-group select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .table-container {
            overflow-x: auto;
            padding: 30px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
        }

        thead {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 1em;
            letter-spacing: 0.5px;
        }

        th:first-child {
            width: 10%;
        }

        th:nth-child(2) {
            width: 15%;
        }

        th:last-child {
            width: 75%;
        }

        tbody tr {
            border-bottom: 1px solid #e9ecef;
            transition: all 0.3s;
        }

        tbody tr:hover {
            background: #f8f9fa;
            transform: scale(1.005);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        td {
            padding: 12px 15px;
            font-size: 0.95em;
        }

        .section-id {
            font-weight: 600;
            color: #2c3e50;
            font-family: 'Courier New', monospace;
        }

        .component-id {
            color: #667eea;
            font-weight: 600;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }

        .component-id:empty::after {
            content: "—";
            color: #ccc;
        }

        .description {
            color: #495057;
            line-height: 1.6;
        }

        .level-0 { padding-left: 0; font-weight: 700; color: #2c3e50; }
        .level-1 { padding-left: 15px; font-weight: 600; }
        .level-2 { padding-left: 30px; }
        .level-3 { padding-left: 45px; font-size: 0.9em; }

        .class-row {
            background: #8095FF;
            font-weight: 700;
            font-size: 1.05em;
        }

        /* Mejorar contraste de texto en filas de clase */
        .class-row td,
        .class-row .section-id,
        .class-row .component-id,
        .class-row .description {
            color: #ffffff;
        }

        .class-row:hover {
            background: #9FAFFF !important;
        }

        .stats {
            padding: 20px 30px;
            background: #f8f9fa;
            border-top: 2px solid #e9ecef;
            text-align: center;
            color: #6c757d;
            font-size: 0.9em;
        }

        .no-results {
            text-align: center;
            padding: 40px;
            color: #6c757d;
            font-size: 1.1em;
        }

        .highlight {
            background: yellow;
            font-weight: 600;
            padding: 2px 4px;
            border-radius: 3px;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 1.8em;
            }

            .controls {
                flex-direction: column;
            }

            .search-box {
                width: 100%;
            }

            th, td {
                padding: 10px;
                font-size: 0.85em;
            }

            th:first-child, td:first-child {
                width: 15%;
            }

            th:nth-child(2), td:nth-child(2) {
                width: 20%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 CC:2022 Tabla de Contenidos</h1>
            <p>Common Criteria for Information Technology Security Evaluation - Part 2</p>
        </div>

        <div class="controls">
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="🔍 Buscar por identificador o descripción...">
            </div>
            <div class="filter-group">
                <label for="classFilter">Clase:</label>
                <select id="classFilter">
                    <option value="">Todas las clases</option>
                    <option value="FAU">FAU: Security audit</option>
                    <option value="FCO">FCO: Communication</option>
                    <option value="FCS">FCS: Cryptographic support</option>
                    <option value="FDP">FDP: User data protection</option>
                    <option value="FIA">FIA: Identification and authentication</option>
                    <option value="FMT">FMT: Security management</option>
                    <option value="FPR">FPR: Privacy</option>
                    <option value="FPT">FPT: Protection of the TSF</option>
                    <option value="FRU">FRU: Resource utilization</option>
                    <option value="FTA">FTA: TOE access</option>
                    <option value="FTP">FTP: Trusted path/channels</option>
                </select>
            </div>
        </div>

        <div class="table-container">
            <table id="contentTable">
                <thead>
                    <tr>
                        <th>Sección</th>
                        <th>Identificador</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
''' + table_rows + '''
                </tbody>
            </table>
            <div id="noResults" class="no-results" style="display: none;">
                ❌ No se encontraron resultados para tu búsqueda.
            </div>
        </div>

        <div class="stats">
            <span id="totalRows">Cargando datos...</span>
        </div>
    </div>

    <script>
        const searchInput = document.getElementById('searchInput');
        const classFilter = document.getElementById('classFilter');
        const tableBody = document.getElementById('tableBody');
        const noResults = document.getElementById('noResults');
        const totalRowsSpan = document.getElementById('totalRows');

        function updateStats() {
            const visibleRows = Array.from(tableBody.querySelectorAll('tr')).filter(row => {
                return row.style.display !== 'none';
            }).length;
            const totalRows = tableBody.querySelectorAll('tr').length;
            totalRowsSpan.textContent = `Mostrando ${visibleRows} de ${totalRows} elementos`;
        }

        function filterTable() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedClass = classFilter.value;
            const rows = tableBody.querySelectorAll('tr');
            let visibleCount = 0;

            rows.forEach(row => {
                const sectionId = row.querySelector('.section-id')?.textContent.toLowerCase() || '';
                const componentId = row.querySelector('.component-id')?.textContent.toLowerCase() || '';
                const description = row.querySelector('.description')?.textContent.toLowerCase() || '';
                const rowClass = row.dataset.class || '';

                const matchesSearch = sectionId.includes(searchTerm) || 
                                    componentId.includes(searchTerm) || 
                                    description.includes(searchTerm);
                const matchesClass = !selectedClass || rowClass === selectedClass;

                if (matchesSearch && matchesClass) {
                    row.style.display = '';
                    visibleCount++;
                    highlightText(row, searchTerm);
                } else {
                    row.style.display = 'none';
                }
            });

            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            document.querySelector('.table-container table').style.display = visibleCount === 0 ? 'none' : 'table';
            updateStats();
        }

        function highlightText(row, term) {
            const descriptionCell = row.querySelector('.description');
            if (!descriptionCell) return;
            
            // Guardar el texto original si no existe
            if (!descriptionCell.dataset.originalText) {
                descriptionCell.dataset.originalText = descriptionCell.textContent;
            }
            
            if (!term) {
                descriptionCell.textContent = descriptionCell.dataset.originalText;
                return;
            }

            const text = descriptionCell.dataset.originalText;
            const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})`, 'gi');
            descriptionCell.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
        }

        searchInput.addEventListener('input', filterTable);
        classFilter.addEventListener('change', filterTable);

        // Initial stats update
        updateStats();
        
        // Smooth scroll behavior
        document.querySelectorAll('tbody tr').forEach(row => {
            row.addEventListener('click', function() {
                this.style.backgroundColor = '#fff3cd';
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 1000);
            });
        });
    </script>
</body>
</html>'''
    
    # Escribir el archivo HTML
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_template)
    
    print(f"✅ Archivo HTML generado exitosamente: {output_file}")
    print(f"📊 Total de entradas procesadas: {len(entries)}")

if __name__ == '__main__':
    txt_file = 'New Text Document.txt'
    output_file = 'tabla_contenidos.html'
    
    try:
        generate_complete_html(txt_file, output_file)
    except FileNotFoundError:
        print(f"❌ Error: No se encontró el archivo '{txt_file}'")
        print("Por favor, asegúrate de que el archivo esté en el mismo directorio que este script.")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
