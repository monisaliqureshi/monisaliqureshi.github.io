-- Insert sample projects
INSERT INTO projects (title, description, image_url, demo_url, code_url, created_date, is_featured, order_index) VALUES
(
  'AI-Powered Portfolio Builder',
  'A modern portfolio builder that uses AI to generate personalized content and designs. Built with Next.js, TypeScript, and Supabase for seamless data management and real-time updates.',
  '/placeholder.svg?height=400&width=600',
  'https://demo.example.com',
  'https://github.com/example/portfolio',
  '2024-01-15',
  true,
  1
),
(
  'E-Commerce Platform',
  'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Features include real-time order tracking and customer analytics.',
  '/placeholder.svg?height=400&width=600',
  'https://demo.example.com',
  'https://github.com/example/ecommerce',
  '2023-11-20',
  true,
  2
),
(
  'Task Management App',
  'Collaborative task management application with drag-and-drop interface, team collaboration features, and progress tracking. Built for productivity and team coordination.',
  '/placeholder.svg?height=400&width=600',
  'https://demo.example.com',
  'https://github.com/example/tasks',
  '2023-09-10',
  false,
  3
);

-- Get project IDs for adding technologies
DO $$
DECLARE
  portfolio_id UUID;
  ecommerce_id UUID;
  tasks_id UUID;
BEGIN
  SELECT id INTO portfolio_id FROM projects WHERE title = 'AI-Powered Portfolio Builder';
  SELECT id INTO ecommerce_id FROM projects WHERE title = 'E-Commerce Platform';
  SELECT id INTO tasks_id FROM projects WHERE title = 'Task Management App';

  -- Technologies for Portfolio Builder
  INSERT INTO project_technologies (project_id, technology_name, technology_icon_url, order_index) VALUES
  (portfolio_id, 'Next.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', 1),
  (portfolio_id, 'TypeScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 2),
  (portfolio_id, 'Supabase', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', 3),
  (portfolio_id, 'Tailwind CSS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', 4);

  -- Technologies for E-Commerce
  INSERT INTO project_technologies (project_id, technology_name, technology_icon_url, order_index) VALUES
  (ecommerce_id, 'React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 1),
  (ecommerce_id, 'Node.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 2),
  (ecommerce_id, 'PostgreSQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 3),
  (ecommerce_id, 'Stripe', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stripe/stripe-original.svg', 4);

  -- Technologies for Task Management
  INSERT INTO project_technologies (project_id, technology_name, technology_icon_url, order_index) VALUES
  (tasks_id, 'React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 1),
  (tasks_id, 'TypeScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 2),
  (tasks_id, 'MongoDB', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 3),
  (tasks_id, 'Express', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', 4);
END $$;
