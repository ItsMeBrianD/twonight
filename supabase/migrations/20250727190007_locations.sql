CREATE TABLE locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID NOT NULL REFERENCES auth.users (id)
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create owned locations" ON locations    
    FOR INSERT    
    TO authenticated    
    WITH CHECK ((select auth.uid()) = created_by);    
    
CREATE POLICY "Users can update owned locations" ON locations    
    FOR UPDATE    
    TO authenticated    
    USING ((select auth.uid()) = created_by);    
    
CREATE POLICY "Users can delete owned locations" ON locations    
    FOR DELETE    
    TO authenticated    
    USING ((select auth.uid()) = created_by);    
    
CREATE POLICY "Users can read owned locations" ON locations    
    FOR SELECT    
    TO authenticated    
    USING ((select auth.uid()) = created_by);    

CREATE POLICY "Users can read public locations" ON locations    
    FOR SELECT    
    TO anon, authenticated
    USING (public);    
    