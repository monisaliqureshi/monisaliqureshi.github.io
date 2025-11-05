-- Fix typo in home_sections title: "Data Sciencee & AI" -> "Data Science & AI"
UPDATE home_sections 
SET title = 'Data Science & AI' 
WHERE title = 'Data Sciencee & AI';
