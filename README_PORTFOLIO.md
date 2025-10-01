# Ragini Kumari - Portfolio Website

A modern, responsive portfolio website built with Python Flask, showcasing Ragini's skills, projects, travel experiences, and more.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Sections**: 
  - Hero section with profile photo
  - About me with college memories
  - Skills showcase with tabbed interface
  - Featured projects with live demos
  - Travel destinations gallery
  - Hobbies and interests
  - Contact information
- **Performance Optimized**: Fast loading with optimized images and CSS
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 🛠️ Technology Stack

- **Backend**: Python 3.8+ with Flask 3.0
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5.3 + Custom CSS
- **Icons**: Font Awesome 6.4
- **Fonts**: Google Fonts (Inter)
- **Animations**: CSS animations and JavaScript interactions

## 📁 Project Structure

```
portfolio/
├── app.py                 # Main Flask application
├── run.py                 # Development server runner
├── requirements.txt       # Python dependencies
├── templates/            
│   ├── base.html         # Base template
│   ├── index.html        # Main portfolio page
│   └── 404.html          # Error page
├── static/
│   ├── css/
│   │   └── style.css     # Custom styles
│   ├── js/
│   │   └── main.js       # Interactive features
│   └── images/           # Photos and assets
│       └── README.md     # Image upload guide
└── README_PORTFOLIO.md   # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Clone or download the project files**
   ```bash
   # If using git
   git clone <repository-url>
   cd portfolio
   
   # Or download and extract the ZIP file
   ```

2. **Create a virtual environment (recommended)**
   ```bash
   python -m venv portfolio_env
   
   # On Windows
   portfolio_env\Scripts\activate
   
   # On macOS/Linux
   source portfolio_env/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Add your photos** (See `static/images/README.md` for details)
   - Add your profile photo as `static/images/profile.jpg`
   - Add other photos following the guide in the images directory

5. **Run the development server**
   ```bash
   python run.py
   ```

6. **Open your browser**
   - Visit: http://localhost:5000
   - The website will automatically reload when you make changes

## 📸 Adding Your Photos

1. **Profile Photo**: Save as `static/images/profile.jpg` (400x400px recommended)
2. **Travel Photos**: Create `static/images/travel/` directory and add photos
3. **Project Screenshots**: Create `static/images/projects/` directory
4. **College Memories**: Create `static/images/college/` directory
5. **Hobby Photos**: Create `static/images/hobbies/` directory

See `static/images/README.md` for detailed instructions.

## ✏️ Customization

### Personal Information

Edit the `PORTFOLIO_DATA` dictionary in `app.py`:

```python
PORTFOLIO_DATA = {
    'name': 'Your Name',
    'title': 'Your Title',
    'about': 'Your description...',
    'linkedin': 'your-linkedin-url',
    'github': 'your-github-url',
    'email': 'your-email@example.com',
    # ... update other sections
}
```

### Styling

- **Colors**: Modify CSS variables in `static/css/style.css`
- **Fonts**: Change Google Fonts import in `templates/base.html`
- **Layout**: Customize Bootstrap classes in templates

### Adding New Sections

1. Add data to `PORTFOLIO_DATA` in `app.py`
2. Create HTML section in `templates/index.html`
3. Add corresponding styles in `static/css/style.css`
4. Add any JavaScript interactions in `static/js/main.js`

## 🌐 Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
2. **Create Heroku app**
   ```bash
   heroku create your-portfolio-name
   ```
3. **Add Procfile**
   ```
   web: gunicorn app:app
   ```
4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push heroku main
   ```

### Option 2: PythonAnywhere

1. Upload files to PythonAnywhere
2. Create a new web app with Flask
3. Point to your `app.py` file
4. Install requirements in the console

### Option 3: DigitalOcean/AWS

1. Set up a server with Python
2. Install dependencies
3. Use gunicorn to serve the app
4. Set up nginx as reverse proxy (optional)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

### Running in Development Mode

```bash
python run.py
```

### Environment Variables

Create a `.env` file for production:

```env
SECRET_KEY=your-secret-key-here
FLASK_ENV=production
```

### Adding Features

1. **New Routes**: Add to `app.py`
2. **New Templates**: Create in `templates/`
3. **New Styles**: Add to `static/css/style.css`
4. **New JavaScript**: Add to `static/js/main.js`

## 📞 Support

If you need help:

1. Check the `static/images/README.md` for image guidelines
2. Review the customization section above
3. Check Flask documentation: https://flask.palletsprojects.com/
4. Bootstrap documentation: https://getbootstrap.com/docs/

## 📄 License

This portfolio template is free to use and modify for personal projects.

---

**Built with ❤️ for Ragini Kumari**

Happy coding! 🚀