-- Create wig_options table
CREATE TABLE IF NOT EXISTS wig_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  image_url TEXT,
  description TEXT,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wig_customizations table
CREATE TABLE IF NOT EXISTS wig_customizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cap_size VARCHAR(10) NOT NULL,
  length VARCHAR(10) NOT NULL,
  density VARCHAR(10) NOT NULL,
  lace VARCHAR(20) NOT NULL,
  texture VARCHAR(20) NOT NULL,
  color VARCHAR(20) NOT NULL,
  hairline VARCHAR(20) NOT NULL,
  styling VARCHAR(20) NOT NULL,
  add_ons TEXT[] DEFAULT '{}',
  base_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_wig_options_category ON wig_options(category);
CREATE INDEX IF NOT EXISTS idx_wig_customizations_user_id ON wig_customizations(user_id);
CREATE INDEX IF NOT EXISTS idx_wig_customizations_created_at ON wig_customizations(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE wig_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE wig_customizations ENABLE ROW LEVEL SECURITY;

-- Create policies for wig_options (public read access)
CREATE POLICY "Allow public read access to wig_options" ON wig_options
  FOR SELECT USING (true);

-- Create policies for wig_customizations (users can only access their own)
CREATE POLICY "Users can view their own customizations" ON wig_customizations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own customizations" ON wig_customizations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customizations" ON wig_customizations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customizations" ON wig_customizations
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_wig_options_updated_at BEFORE UPDATE ON wig_options
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wig_customizations_updated_at BEFORE UPDATE ON wig_customizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
