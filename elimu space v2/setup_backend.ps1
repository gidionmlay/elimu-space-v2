# Elimu Space Backend Setup Script for Windows PowerShell
# Run this script to automatically set up the Django backend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Elimu Space Backend Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "✓ Python is installed: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python is not installed. Please install Python 3.8+ first." -ForegroundColor Red
    exit 1
}

# Create virtual environment
Write-Host "`nCreating virtual environment..." -ForegroundColor Yellow
python -m venv venv

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

# Upgrade pip
Write-Host "`nUpgrading pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# Install requirements
Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

# Create Django project
Write-Host "`nCreating Django project..." -ForegroundColor Yellow
if (Test-Path "elimu_backend") {
    Write-Host "✓ Django project already exists" -ForegroundColor Green
} else {
    django-admin startproject elimu_backend .
    Write-Host "✓ Django project created" -ForegroundColor Green
}

# Create Django apps
Write-Host "`nCreating Django apps..." -ForegroundColor Yellow
$apps = @("users", "courses", "dashboard")
foreach ($app in $apps) {
    if (Test-Path $app) {
        Write-Host "✓ App '$app' already exists" -ForegroundColor Green
    } else {
        python manage.py startapp $app
        Write-Host "✓ App '$app' created" -ForegroundColor Green
    }
}

# Copy configuration files
Write-Host "`nSetting up configuration files..." -ForegroundColor Yellow

# Copy settings.py
if (Test-Path "DJANGO_SETTINGS.py") {
    Write-Host "Please manually copy DJANGO_SETTINGS.py to elimu_backend/settings.py" -ForegroundColor Yellow
}

# Copy users files
if (Test-Path "USERS_MODELS.py") {
    Write-Host "Please manually copy USERS_MODELS.py to users/models.py" -ForegroundColor Yellow
}

if (Test-Path "USERS_SERIALIZERS.py") {
    Write-Host "Please manually copy USERS_SERIALIZERS.py to users/serializers.py" -ForegroundColor Yellow
}

if (Test-Path "USERS_VIEWS.py") {
    Write-Host "Please manually copy USERS_VIEWS.py to users/views.py" -ForegroundColor Yellow
}

if (Test-Path "USERS_ADMIN.py") {
    Write-Host "Please manually copy USERS_ADMIN.py to users/admin.py" -ForegroundColor Yellow
}

# Copy urls.py
if (Test-Path "DJANGO_URLS.py") {
    Write-Host "Please manually copy DJANGO_URLS.py to elimu_backend/urls.py" -ForegroundColor Yellow
}

# Create .env file
Write-Host "`nCreating .env file..." -ForegroundColor Yellow
if (Test-Path "env.example") {
    Copy-Item "env.example" ".env"
    Write-Host "✓ .env file created from env.example" -ForegroundColor Green
    Write-Host "⚠ Please update .env with your configuration" -ForegroundColor Yellow
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Update elimu_backend/settings.py with DJANGO_SETTINGS.py content" -ForegroundColor White
Write-Host "2. Update users/models.py with USERS_MODELS.py content" -ForegroundColor White
Write-Host "3. Update users/serializers.py with USERS_SERIALIZERS.py content" -ForegroundColor White
Write-Host "4. Update users/views.py with USERS_VIEWS.py content" -ForegroundColor White
Write-Host "5. Update users/admin.py with USERS_ADMIN.py content" -ForegroundColor White
Write-Host "6. Update elimu_backend/urls.py with DJANGO_URLS.py content" -ForegroundColor White
Write-Host "7. Configure your .env file" -ForegroundColor White
Write-Host "8. Run: python manage.py makemigrations" -ForegroundColor White
Write-Host "9. Run: python manage.py migrate" -ForegroundColor White
Write-Host "10. Run: python manage.py createsuperuser" -ForegroundColor White
Write-Host "11. Run: python manage.py runserver" -ForegroundColor White

Write-Host "`nFor detailed instructions, see BACKEND_SETUP_GUIDE.md" -ForegroundColor Cyan

