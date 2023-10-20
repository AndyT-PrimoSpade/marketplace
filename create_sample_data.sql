-- Companies table
INSERT INTO Companies (CompanyName, CompanyAddress, ACRA, Phone, Industry, Logo, JoinDate)
VALUES
  ('Google', '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA', '20080904C', '+1 650-253-0000', 'Technology', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png', '1998-09-04'),
  ('Amazon', '410 Terry Ave N, Seattle, WA 98109, USA', '19940705W', '+1 206-266-1000', 'E-commerce', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png', '1994-07-05'),
  ('Microsoft', 'One Microsoft Way, Redmond, WA 98052, USA', '19750404W', '+1 425-882-8080', 'Software', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png', '1975-04-04');

-- Users table
INSERT INTO Users (CompanyID, FirstName, LastName, Email, PasswordHash, JobRole)
VALUES
  (1, 'John', 'Doe', 'john.doe@example.com', '$2y$10$1234567890', 'Software Engineer'),
  (2, 'Jane', 'Doe', 'jane.doe@example.com', '$2y$10$9876543210', 'Product Manager'),
  (3, 'Peter', 'Parker', 'peter.parker@example.com', '$2y$10$0987654321', 'Web Developer');

-- Categories table
INSERT INTO Categories (CategoryID, MainCategory, SubCategory)
VALUES
  ('1', 'Hardware', 'Laptop'),
  ('2', 'Hardware', 'Phone'),
  ('3', 'Software', 'MicroSoft');

-- Products table
INSERT INTO Products (CategoryID, BrandName, ProductName, Description, Image)
VALUES
  (1, 'Apple', 'MacBook Air', 'The new MacBook Air is lighter and thinner than ever, and features a stunning Retina display. It\'s also powered by the all-new M2 chip, so it\'s faster and more efficient than ever.', 'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'),
  (1, 'Microsoft', 'Surface Laptop 4', 'The Surface Laptop 4 is the perfect laptop for students, professionals, and creatives alike. It features a sleek design, all-day battery life, and powerful performance.', 'https://assets.hardwarezone.com/img/2021/06/ms-surfacelaptop4-intro1.jpg'),
  (2, 'Apple', 'Iphone 14', 'The iPhone 14 Pro is the latest and greatest smartphone from Apple. It features a new design, a faster chip, and a better camera.', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-blue?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1661026582322'),
  (3, 'Microsoft', 'Microsoft Office', 'Microsoft Office is a suite of productivity software that includes applications such as Word, Excel, PowerPoint, and Outlook.', 'https://i.pcmag.com/imagery/reviews/03dMlmUINQZI4wd0gdGznsI-13.fit_scale.size_1028x578.v1613659471.png');

-- ProductPricing table
INSERT INTO ProductPricing (ProductID, TermLength, Price)
VALUES
  (1, 12, 999),
  (1, 24, 1799),
  (2, 12, 799),
  (2, 24, 1199),
  (3, 12, 599),
  (3, 24, 999),
  (4, 12, 199),
  (4, 24, 299);

-- Orders table
INSERT INTO Orders (UserID, CompanyID, TotalAmount, CreatedDate)
VALUES
  (1, 1, 999, '2023-10-10 12:00:00');

-- Cart table
INSERT INTO Cart (ProductID, Quantity, UnitPrice, TermLength, IsCheckedOut, OrderID)
VALUES
  (1, 1, 999, 12, TRUE, 1),
  (2, 1, 799, 12, TRUE, 1);

INSERT INTO Cart (ProductID, Quantity, UnitPrice, TermLength)
VALUES
  (3, 1, 999, 24),
  (4, 1, 299, 24);
  
-- Subscriptions table
INSERT INTO Subscriptions (CompanyID, ProductID, SubscriptionStartDate, SubscriptionEndDate, CartID)
VALUES
  (1, 1, '2023-10-10', '2024-09-30', 1),
  (1, 2, '2023-10-10', '2024-09-30', 2);

