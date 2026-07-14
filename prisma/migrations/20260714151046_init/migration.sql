-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "originalPrice" REAL,
    "rating" REAL NOT NULL DEFAULT 0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "images" TEXT NOT NULL DEFAULT '[]',
    "category" TEXT NOT NULL,
    "badge" TEXT,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',
    "features" TEXT NOT NULL DEFAULT '[]',
    "specifications" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "subtotal" REAL NOT NULL,
    "shipping" REAL NOT NULL,
    "tax" REAL NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "productSlug" TEXT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_productSlug_fkey" FOREIGN KEY ("productSlug") REFERENCES "Product" ("slug") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'percent',
    "value" REAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Order_number_key" ON "Order"("number");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Discount_code_key" ON "Discount"("code");
