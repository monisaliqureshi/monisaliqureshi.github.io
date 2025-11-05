-- Add RLS policies for authenticated users to manage projects
CREATE POLICY "Allow authenticated users to insert projects" 
ON projects FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update projects" 
ON projects FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated users to delete projects" 
ON projects FOR DELETE 
TO authenticated 
USING (true);

-- Add RLS policies for project_technologies
CREATE POLICY "Allow authenticated users to insert project_technologies" 
ON project_technologies FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update project_technologies" 
ON project_technologies FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated users to delete project_technologies" 
ON project_technologies FOR DELETE 
TO authenticated 
USING (true);
