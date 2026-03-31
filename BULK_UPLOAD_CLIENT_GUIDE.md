# Bulk Product Upload Guide
### Kagzi India — Admin Panel

---

## Before You Start

Make sure you have:
- Access to the Admin Panel
- Your product details ready (name, price, category, etc.)
- All product images saved on your computer with **simple filenames** (no spaces)

> **Image Naming Tip:** Rename your images like `notebook1.jpg`, `diary_front.jpg` — avoid spaces and special characters like `( ) & #`

---

## Step 1 — Go to Bulk Upload

1. Login to the Admin Panel
2. In the left sidebar, click **"Bulk Upload"**

---

## Step 2 — Download the CSV Template

1. Click the **"Download Template"** button
2. Open the downloaded file in **Microsoft Excel** or **Google Sheets**

---

## Step 3 — Fill in the CSV File

Each row in the CSV = one product. Fill in the columns as follows:

| Column | Required | What to Write | Example |
|---|---|---|---|
| `name` | ✅ Yes | Product name | `Premium Notebook` |
| `description` | No | Short description | `Handmade eco-friendly notebook` |
| `price` | ✅ Yes | Number only, no ₹ | `299` |
| `minimumOrderQuantity` | No | Minimum units per order | `50` |
| `categoryId` | ✅ Yes | Exact category name | `Notebooks` |
| `subcategoryId` | No | Exact subcategory name | `Spiral Notebooks` |
| `size` | No | Paper size | `A5 (148 x 210 mm)` |
| `coverMaterial` | No | Material name | `Handmade Paper` |
| `bindingType` | No | Binding type | `Thread Binding` |
| `coverType` | No | Cover type | `Hard Cover` |
| `usageApplication` | No | Usage | `Office, Personal` |
| `gsm` | No | Paper weight (number) | `120` |
| `coverPrint` | No | Print type | `Screen Print` |
| `color` | No | Color name | `Natural Brown` |
| `stock` | No | Available quantity | `100` |
| `tags` | No | Keywords separated by `\|` | `notebook\|diary\|journal` |
| `imagePaths` | No | Image filenames separated by `\|` | `product1.jpg\|product2.jpg` |

### Important Rules

**For `categoryId` and `subcategoryId`:**
- Write the **exact name** as it appears in the system
- Example: `Notebooks` ✅ — `notebook` ❌ — `NOTEBOOKS` ❌

**For `imagePaths`:**
- Write **only the filename**, not the full path
- ✅ Correct: `notebook1.jpg`
- ❌ Wrong: `C:/Users/Admin/Pictures/notebook1.jpg`
- For multiple images, separate with `|` (pipe): `front.jpg|back.jpg|side.jpg`

**For `tags`:**
- Separate multiple tags with `|` (pipe): `notebook|diary|journal`

**For fields with commas** (like `usageApplication`):
- Wrap the value in double quotes: `"Office, Personal"`

---

## Step 4 — Prepare Your Images

1. Collect all product images in one folder on your computer
2. Make sure filenames **exactly match** what you wrote in the CSV
3. Rename files if needed — remove spaces and special characters

**Example:**
```
CSV imagePaths column:  notebook_front.jpg|notebook_back.jpg
Your actual files:      notebook_front.jpg  ✅
                        notebook_back.jpg   ✅
```

---

## Step 5 — Upload

1. Go back to **Admin Panel → Bulk Upload**
2. In **"Step 2: Upload CSV File"** — click and select your filled CSV file
3. In **"Click to select product images"** — select **all image files** you referenced in the CSV
4. You will see the image filenames listed as tags below the picker
5. Click **"Upload and Process"**
6. Wait for the results

---

## Step 6 — Check Results

After upload, you will see:

- ✅ **Successful** — products added successfully
- ❌ **Failed** — products that had errors
- **Errors list** — exact reason for each failure

### Common Errors and Fixes

| Error | Fix |
|---|---|
| `Category not found` | Check spelling of category name — must be exact |
| `Image not found in uploaded files` | Make sure you selected that image file in the images picker |
| `Missing required field: name` | Fill in the product name column |

---

## Full Example

**CSV row:**
```
name: Handmade Notebook
price: 350
minimumOrderQuantity: 25
categoryId: Notebooks
subcategoryId: Hardbound Notebooks
size: A5 (148 x 210 mm)
coverMaterial: Handmade Paper
bindingType: Thread Binding
coverType: Hard Cover
usageApplication: "Office, Personal"
gsm: 120
color: Natural Brown
stock: 200
tags: notebook|handmade|eco
imagePaths: notebook_front.jpg|notebook_back.jpg
```

**Images to select:** `notebook_front.jpg` and `notebook_back.jpg`

---

## Tips for Smooth Upload

- Upload **batch wise** — 20-30 products at a time works best
- Keep image file sizes under **5MB each**
- Always double-check category names before uploading
- Save your CSV as `.csv` format (not `.xlsx`) for best results

---

*For any issues, contact the development team.*
