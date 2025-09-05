-- Fire Safety Equipment Management Database Schema

-- Equipment Types Table
CREATE TABLE IF NOT EXISTS equipment_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Equipment Table
CREATE TABLE IF NOT EXISTS equipment (
    id SERIAL PRIMARY KEY,
    barcode VARCHAR(100) NOT NULL UNIQUE,
    equipment_type_id INTEGER REFERENCES equipment_types(id),
    location VARCHAR(200) NOT NULL,
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    installation_date DATE,
    last_inspection_date DATE,
    next_inspection_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inspection Checklists Table
CREATE TABLE IF NOT EXISTS inspection_checklists (
    id SERIAL PRIMARY KEY,
    equipment_id INTEGER REFERENCES equipment(id),
    inspector_name VARCHAR(100) NOT NULL,
    inspection_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    overall_condition VARCHAR(50) NOT NULL,
    accessibility_check BOOLEAN DEFAULT FALSE,
    visual_condition_check BOOLEAN DEFAULT FALSE,
    pressure_gauge_check BOOLEAN DEFAULT FALSE,
    seal_intact_check BOOLEAN DEFAULT FALSE,
    location_correct_check BOOLEAN DEFAULT FALSE,
    signage_visible_check BOOLEAN DEFAULT FALSE,
    notes TEXT,
    photos JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default equipment types
INSERT INTO equipment_types (name, description, icon) VALUES
('Fire Extinguisher', 'Portable fire extinguishing equipment', '🧯'),
('Fire Alarm', 'Fire detection and alarm systems', '🚨'),
('Hydrant', 'Fire hydrant systems', '🚰'),
('Hydrant Pump', 'Hydrant pump systems', '⚙️'),
('Emergency Light', 'Emergency lighting systems', '💡'),
('Emergency Door', 'Emergency exit doors', '🚪'),
('Fire Suppression', 'Fire suppression systems', '🔥')
ON CONFLICT (name) DO NOTHING;
