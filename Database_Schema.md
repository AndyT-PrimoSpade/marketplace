## Database Schema Design

The following database schema design can be used for a marketplace where the companies are the users and where subscriptions are supported:

**Tables:**

* Companies
    * CompanyID (INT, primary key)
    * CompanyName (VARCHAR(255))
    * CompanyAddress (VARCHAR(255))
    * ACRA (VARCHAR(10))
    * Phone (VARCHAR(15))
    * Industry (VARCHAR(255))
    * Logo (VARCHAR(255))
    * JoinDate (DATE)
      
* Users
    * UserID (INT, primary key)
    * CompanyID (INT, foreign key to Companies)
    * FirstName (VARCHAR(255))
    * LastName (VARCHAR(255))
    * Email (VARCHAR(255))
    * PasswordHash (VARCHAR(255))
    * JobRole (VARCHAR(255))
      
* Categories
    * CategoryID (INT, primary key)
    * MainCategory (VARCHAR(255))
    * SubCategory (VARCHAR(255))
      
* Products
    * ProductID (INT, primary key)
    * CategoryID (INT, foreign key to Categories)
    * BrandName (VARCHAR(255))
    * ProductName (VARCHAR(255))
    * Description (TEXT)
    * Image (VARCHAR(255))
      
* ProductPricing
    * PricingID (INT, primary key)
    * ProductID (INT, foreign key to Products)
    * TermLength (INT)
    * Price (DECIMAL(10,2))
      
* Orders
    * OrderID (INT, primary key)
    * UserID (INT, foreign key to Users)
    * CompanyID (INT, foreign key to Companies)
    * TotalAmount (DECIMAL(10,2))
    * CreatedDate (DATETIME)
    * OrderStatus (VARCHAR(255))
      
* Cart
    * CartID (INT, primary key)
    * ProductID (INT, foreign key to Products)
    * Quantity (INT)
    * UnitPrice (DECIMAL(10,2))
    * TermLength (INT)
    * IsCheckedOut BOOLEAN
    * OrderID INT
 
* Subscriptions
    * SubscriptionID (INT, primary key)
    * CompanyID (INT, foreign key to Companies)
    * ProductID (INT, foreign key to Products)
    * SubscriptionStartDate (DATE)
    * SubscriptionEndDate (DATE)
    * CartID (INT, foreign key to Cart)
      

**Relationships:**

* One company can have many products.
* One product can have many pricing options.
* One company can have many subscriptions.
* One subscription is for one product.
* One order can have many order items.
* One company can place many orders.

**Example Queries:**

The following example queries show how to use the database schema design to retrieve data (Some of the query is based on old design schema so might not able to use):

```sql
-- Get all companies.
SELECT * FROM Companies;

-- Get all products.
SELECT * FROM Products;

-- Get all pricing options for a product.
SELECT * FROM ProductPricing WHERE ProductID = 1;

-- Get all subscriptions for a company.
SELECT * FROM Subscriptions WHERE CompanyID = 1;

-- Get all orders for a company.
SELECT * FROM Orders WHERE CompanyID = 1;

-- Get order items for a company from an order.
SELECT * FROM cart
WHERE OrderID = (
  SELECT OrderID FROM Orders
  WHERE CompanyID = 1
  AND OrderID = 10
);

-- Get all products that are available for subscription.
SELECT * FROM Products WHERE ProductID IN (SELECT ProductID FROM ProductPricing WHERE TermLength > 0);

-- Get all products that are subscribed by a company.
SELECT * FROM Products WHERE ProductID IN (SELECT ProductID FROM Subscriptions WHERE CompanyID = 1);

-- Get all subscriptions for a company, along with the product name and price for each subscription.
SELECT Subscriptions.SubscriptionID, Subscriptions.ProductID, Products.ProductName, Products.Price
FROM Subscriptions
INNER JOIN Products ON Subscriptions.ProductID = Products.ProductID
WHERE Subscriptions.CompanyID = 1;

-- Get all orders for a company, along with the total amount and the created date for each order.
SELECT Orders.OrderID, Orders.TotalAmount, Orders.CreatedDate
FROM Orders
WHERE Orders.CompanyID = 1;

-- Get all order items for a company, along with the product name and quantity for each order item.
SELECT cart.ProductID, cart.Quantity, Products.ProductName
FROM cart
INNER JOIN Orders ON cart.OrderID = Orders.OrderID
INNER JOIN Products ON cart.ProductID = Products.ProductID
WHERE Orders.CompanyID = 1;

-- Get report on the most popular subscribed products.
SELECT Products.ProductName, COUNT(Subscriptions.SubscriptionID) AS NumSubscriptions
FROM Subscriptions
INNER JOIN Products ON Subscriptions.ProductID = Products.ProductID
GROUP BY Products.ProductName
ORDER BY NumSubscriptions DESC;

-- Get all products that are subscribed by a company and are expiring within the next 30 days.
SELECT Products.ProductName, Subscriptions.SubscriptionEndDate
FROM Subscriptions
INNER JOIN Products ON Subscriptions.ProductID = Products.ProductID
WHERE Subscriptions.CompanyID = 1
AND Subscriptions.SubscriptionEndDate BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL 30 DAY;

-- Get all orders for a company that were placed in the last month.
SELECT Orders.OrderID, Orders.TotalAmount, Orders.CreatedDate
FROM Orders
WHERE Orders.CompanyID = 1
AND Orders.CreatedDate BETWEEN CURRENT_DATE - INTERVAL 1 MONTH AND CURRENT_DATE;

-- Get the total sales for a company in the last year.
SELECT SUM(Orders.TotalAmount) AS TotalSales
FROM Orders
WHERE Orders.CompanyID = 1
AND Orders.CreatedDate BETWEEN CURRENT_DATE - INTERVAL 1 YEAR AND CURRENT_DATE;

-- Get the top 10 highest-grossing products for a company.
SELECT Products.ProductName, SUM(cart.Quantity * cart.UnitPrice) AS TotalRevenue
FROM cart
INNER JOIN Orders ON cart.OrderID = Orders.OrderID
INNER JOIN Products ON cart.ProductID = Products.ProductID
WHERE Orders.CompanyID = 1
GROUP BY Products.ProductName
ORDER BY TotalRevenue DESC
LIMIT 10;

-- A trigger that will update the subscription when an order is made.
CREATE TRIGGER update_subscription
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN

  DECLARE @subscriptionID INT;

  -- Get the subscription ID for the order.
  SELECT @subscriptionID = SubscriptionID
  FROM Subscriptions
  WHERE CompanyID = NEW.CompanyID
  AND ProductID = NEW.ProductID;

  -- If the subscription ID exists, update the subscription.
  IF @subscriptionID IS NOT NULL
  BEGIN
    UPDATE Subscriptions
    SET SubscriptionEndDate = DATE_ADD(SubscriptionEndDate, INTERVAL cart.TermLength MONTH)
    WHERE SubscriptionID = @subscriptionID;
  END;

END;

