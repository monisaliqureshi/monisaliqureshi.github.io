-- Seed GitHub achievements (with placeholder images)
INSERT INTO github_achievements (badge_name, badge_description, badge_image_url, verification_link, unlocked_date, display_order) VALUES
('Arctic Code Vault', 'Contributed code to the 2020 GitHub Archive Program', '/placeholder.svg?height=100&width=100', 'https://github.com', '2023-11-05', 1),
('Pull Shark', 'Opened multiple pull requests', '/placeholder.svg?height=100&width=100', 'https://github.com', '2023-11-05', 2),
('Quickdraw', 'Closed an issue or pull request within 5 minutes of opening', '/placeholder.svg?height=100&width=100', 'https://github.com', '2023-11-05', 3),
('YOLO', 'Merged a pull request without review', '/placeholder.svg?height=100&width=100', 'https://github.com', '2023-11-05', 4),
('Starstruck', 'Created a repository that has 16 stars', '/placeholder.svg?height=100&width=100', 'https://github.com', '2023-11-05', 5);

-- Seed professional certifications
INSERT INTO professional_certifications (cert_name, cert_description, cert_image_url, verification_link, issued_date, issuer, display_order) VALUES
('Meta Backend Developer', 'Professional Certificate in Backend Development', '/placeholder.svg?height=150&width=150', 'https://www.coursera.org/account/accomplishments/professional-cert/verify', '2024-01-15', 'Meta', 1),
('Google Data Analytics', 'Professional Certificate in Data Analytics', '/placeholder.svg?height=150&width=150', 'https://www.coursera.org/account/accomplishments/professional-cert/verify', '2024-02-20', 'Google', 2);
