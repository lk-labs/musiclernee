-- Create database and tables for CVGPraySing website

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Teaching materials table for YouTube videos
CREATE TABLE IF NOT EXISTS teaching_materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    youtube_url VARCHAR(500) NOT NULL,
    youtube_id VARCHAR(50) NOT NULL,
    category ENUM('composition', 'foundation', 'auditing', 'teaching') DEFAULT 'teaching',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('CVGPraySing Admin', 'admin@cvgpraysing.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'admin');

-- Insert sample FAQs
INSERT INTO faqs (question, answer, display_order) VALUES 
('What age groups do you teach?', 'We welcome students of all ages, from children as young as 5 to adults. Our programs are tailored to different age groups and skill levels.', 1),
('Do I need prior musical experience?', 'Not at all! Our Music Foundation program is specifically designed for complete beginners. We start with the basics and build from there.', 2),
('What instruments do you teach?', 'We specialize in voice training and piano, but also offer guidance on music theory that applies to various instruments.', 3),
('How are the online lessons conducted?', 'Our teaching materials are available through embedded video tutorials on our platform. Registered users can access these at their own pace.', 4),
('Do you offer custom compositions?', 'Yes! We create original gospel and inspirational music for weddings, worship services, and special events. Contact us to discuss your needs.', 5);

-- Insert sample teaching materials
INSERT INTO teaching_materials (title, description, youtube_url, youtube_id, category) VALUES 
('Introduction to Music Theory', 'Learn the basics of music theory including notes, scales, and rhythm patterns.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'foundation'),
('Gospel Piano Basics', 'Essential gospel piano techniques and chord progressions for beginners.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'teaching'),
('Vocal Warm-up Exercises', 'Daily vocal exercises to improve your singing voice and range.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'teaching');
