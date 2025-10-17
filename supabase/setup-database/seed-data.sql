-- Insert sample wig options data
INSERT INTO wig_options (category, name, price, image_url, description, is_premium) VALUES
-- Cap Size Options
('cap_size', 'XS', 0, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage1.8be4f077.png&w=256&q=75', 'Extra Small cap size', false),
('cap_size', 'S', 0, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage1.8be4f077.png&w=256&q=75', 'Small cap size', false),
('cap_size', 'M', 0, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage1.8be4f077.png&w=256&q=75', 'Medium cap size', false),
('cap_size', 'L', 0, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage1.8be4f077.png&w=256&q=75', 'Large cap size', false),

-- Length Options
('length', '16"', -50, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Shoulder length', false),
('length', '18"', -25, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Mid-back length', false),
('length', '20"', -10, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Long length', false),
('length', '22"', -5, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Very long length', false),
('length', '24"', 0, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Extra long length (default)', false),
('length', '26"', 50, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Super long length', false),
('length', '28"', 100, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Ultra long length', false),
('length', '30"', 150, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Maximum length', false),
('length', '32"', 200, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Maximum length', false),
('length', '34"', 250, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Maximum length', false),
('length', '36"', 300, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Maximum length', false),
('length', '40"', 400, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75', 'Maximum length', false),

-- Density Options
('density', '200%', 0, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage3.d380edd2.png&w=256&q=75', 'Standard density', false),

-- Lace Options
('lace', '13X6', 0, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage4.ea33a249.png&w=256&q=75', '13X6 lace front', true),

-- Texture Options
('texture', 'SILKY', 0, 'https://hair-saloon-one.vercel.app/_next/static/media/image5.5e361069.svg', 'Silky smooth texture', true),

-- Color Options
('color', 'OFF BLACK', 0, 'https://hair-saloon-one.vercel.app/_next/static/media/color1.9a51ab59.svg', 'Off black color', true),

-- Hairline Options
('hairline', 'NATURAL', 0, 'https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage7.295b48ce.png&w=256&q=75', 'Natural hairline', false),

-- Styling Options
('styling', 'NONE', 0, 'https://hair-saloon-one.vercel.app/_next/static/media/image8.be106252.svg', 'No additional styling', false),

-- Add-ons Options
('add_ons', 'NONE', 0, 'https://hair-saloon-one.vercel.app/_next/static/media/image8.be106252.svg', 'No add-ons', false);

-- Update the sequence to avoid conflicts
SELECT setval('wig_options_id_seq', (SELECT MAX(id::text::bigint) FROM wig_options) + 1, false);
