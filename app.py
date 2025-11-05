from flask import Flask, render_template, jsonify
import os
import logging
from logging.handlers import RotatingFileHandler
from datetime import datetime
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_caching import Cache
from dotenv import load_dotenv
import redis


# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')


# Initialize Redis
redis_client = redis.Redis(host='localhost', port=6379, db=0)

# Configure Limiter with Redis
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    storage_uri="redis://localhost:6379",
    storage_options={"socket_connect_timeout": 30},
    strategy="fixed-window"  # or "moving-window"
)


# Configure caching
app.config['CACHE_TYPE'] = 'simple'
app.config['CACHE_DEFAULT_TIMEOUT'] = 300  # 5 minutes
cache = Cache(app)

# Rate limiting - increased for development
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["1000 per day", "200 per hour"]
)

# Configure logging
if not os.path.exists('logs'):
    os.mkdir('logs')
file_handler = RotatingFileHandler('logs/portfolio.log', maxBytes=10240, backupCount=10)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
file_handler.setLevel(logging.INFO)
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)
app.logger.info('Portfolio startup')

# Cache buster version
CACHE_BUSTER = '1.0.0'


# Add common variables to all templates
@app.context_processor
def inject_common():
    return {
        'now': datetime.now(),
        'cache_buster': CACHE_BUSTER,
        'ga_tracking_id': os.environ.get('GA_TRACKING_ID', '')
    }

# Portfolio data
PORTFOLIO_DATA ={
    'name': 'Ragini Kumari',
    # 'title': 'Computer Science Engineering Student',

    'about': '''A passionate Computer Science student and full-stack developer who loves creating 
               innovative solutions and exploring new technologies. Currently pursuing my degree 
               while building amazing projects and traveling to beautiful places.''',
    'linkedin': 'https://www.linkedin.com/in/ragini-kumari1/',
    'github': 'https://github.com/raginikp',
    'email': 'ragini24072004@gmail.com',
    'resume': '/static/files/Ragini_Kumari_Resume.pdf',  # Add your resume file to static/files/
    'location': 'India',
    
    'skills': {
        'languages': [
            {'name': 'Python', 'icon': 'fab fa-python', 'wikipedia': 'https://en.wikipedia.org/wiki/Python_(programming_language)'},
            {'name': 'Java', 'icon': 'fab fa-java', 'wikipedia': 'https://en.wikipedia.org/wiki/Java_(programming_language)'},
            {'name': 'HTML5', 'icon': 'fab fa-html5', 'wikipedia': 'https://en.wikipedia.org/wiki/HTML5'},
            {'name': 'CSS3', 'icon': 'fab fa-css3-alt', 'wikipedia': 'https://en.wikipedia.org/wiki/CSS'},
            {'name': 'AI/ML', 'icon': 'fas fa-robot', 'wikipedia': 'https://en.wikipedia.org/wiki/Artificial_intelligence'}
        ],
        'frameworks': [
            {'name': 'OpenCV', 'icon': 'fas fa-eye', 'wikipedia': 'https://en.wikipedia.org/wiki/OpenCV'},
            {'name': 'NumPy','icon': 'fas fa-calculator', 'wikipedia': 'https://en.wikipedia.org/wiki/NumPy'},
            {'name': 'Pandas', 'icon': 'fas fa-table', 'wikipedia': 'https://en.wikipedia.org/wiki/Pandas_(software)'},
            {'name': 'Scikit-learn','icon': 'fas fa-robot', 'wikipedia': 'https://en.wikipedia.org/wiki/Scikit-learn'},
            {'name': 'Flask','icon': 'fas fa-server', 'wikipedia': 'https://en.wikipedia.org/wiki/Flask_(web_framework)'}
        ],
        'tools': [
            {'name': 'VS Code','icon': 'fas fa-code', 'wikipedia': 'https://en.wikipedia.org/wiki/Visual_Studio_Code'},
            {'name': 'Git', 'icon': 'fab fa-git-alt', 'wikipedia': 'https://en.wikipedia.org/wiki/Git'},
            {'name': 'GitHub','icon': 'fab fa-github', 'wikipedia': 'https://en.wikipedia.org/wiki/GitHub'},
            {'name': 'Linux','icon': 'fab fa-linux', 'wikipedia': 'https://en.wikipedia.org/wiki/Linux'},
            {'name': 'Power BI','icon': 'fas fa-chart-bar', 'wikipedia': 'https://en.wikipedia.org/wiki/Microsoft_Power_BI'},
            {'name': 'PyCharm','icon': 'fas fa-code-branch', 'wikipedia': 'https://en.wikipedia.org/wiki/PyCharm'}
        ]
    },
    
    'projects': [
    {
        'title': 'Sophisticated-Admin-Dashboard-for-Bot-Performance-Evaluation',
        'description': 'A comprehensive dashboard for evaluating bot performance with detailed analytics and metrics',
        'short_description': [
            'It is a bot for a particular data and particular department.'
        ],
        'tech': ['Power Bi'],
        'github': 'https://github.com/raginikp/Sophisticated-Admin-Dashboard-for-Bot-Performance-Evaluation'
    },
    {
        'title': 'Portfolio',
        'description': 'A portfolio that blends AI innovation with personal creativity to showcase who I am and what I stand for.',
        'short_description': [
            'It is a perfect blend of AI with creativity.',
            'Combined many different AI tooks and my knowledge of programming'
        ],
        'tech': ['Python', 'flask', 'jinja2', 'HTML', 'CSS'],
        'github': 'https://github.com/raginikp/Portfolio',
        'screenshots': [
               '/static/images/projects/portfolio1.png'
        ]
    },
    {
        'title': 'News Aggregator',
        'description': 'A web application that aggregates news from various sources and presents them in a clean, organized manner.',
        'short_description': [
            'Aggregates news from multiple sources',
            'Clean and responsive user interface',
            'Customizable news categories'
        ],
        'tech': ['Python', 'Flask', 'BeautifulSoup', 'HTML', 'CSS'],
        'github': 'https://github.com/raginikp/news_aggregator',
        'screenshots': [
               '/static/images/projects/news1.png',
               '/static/images/projects/news2.png'
        ]
    },
    # other projects ...
],
    
    'travel_places':[
        {'name': 'Rajasthan', 'description': 'Majestic palaces and desert landscapes', 'emoji': '🏰'},
        {'name': 'Bihar', 'description': 'Land of ancient wisdom, vibrant culture, and resilient spirit','emoji': '🛕'},
        {'name': 'Himachal Pradesh', 'description': 'Snow-capped mountains and serene valleys', 'emoji': '🏔️'},
        {'name': 'Punjab', 'description': 'The land of five rivers, golden fields, and boundless energy', 'emoji': '🌾'},
        {'name': 'Delhi', 'description': 'Rich history and cultural heritage', 'emoji': '🏛️'},
        {'name': 'Uttar Pradesh', 'description': 'symbolizing its ancient heritage and epic', 'emoji': '📜'},
        {'name': 'Jammu', 'description': 'showcasing its scenic valleys and hill', 'emoji': '🏞️'},
        {'name': 'Jharkhand', 'description': 'Land of Forest', 'emoji': '🌳'},
        {'name': 'West Bengal', 'description': 'Where the Himalayas meet the sea, and culture meets the tradition', 'emoji': '🎭'},
    ],
    
    'hobbies': [
        {'name': 'Photography', 'description': 'Capturing moments and landscapes', 'icon': '📸'},
        {'name': 'Music', 'description': 'Listening to various genres and playing guitar', 'icon': '🎵'},
        {
            'name': 'Reading', 
            'description': 'I love reading books that expand my knowledge and perspective. Here are some of my recent reads:',
            'icon': '📚',
            'books': []  # We'll populate this after PORTFOLIO_DATA is defined
        },
        {'name': 'Traveling', 'description': 'Exploring new places and cultures', 'icon': '✈️'},
        {'name': 'Coding', 'description': 'Building side projects and learning new technologies', 'icon': '💻'},
        {'name': 'Coffee', 'description': 'Exploring different coffee varieties and brewing methods', 'icon': '☕'},
        {'name': 'Dance', 'description': 'Powerful form of expression where movement, rhythm, and music come together to tell a story', 'icon': '💃'}       
    ],
    
    'books': [
        {
            'id': 1,
            'title': 'William Wenton and the Luridium Thief',
            'author': 'Bobbie Peers',
            'cover_image': 'https://i5.walmartimages.com/asr/dd85c7f1-a923-4e16-9c32-fbc98ea6b9a7.c4e3dd3e579655c4eba0c2f04e500243.jpeg',
            'fallback_image': 'https://via.placeholder.com/300x450?text=William+Wenton',
            'description': 'A young code-breaking genius gets caught up in an international adventure.',
            'genre': 'Middle Grade, Adventure',
            'pages': 288,
            'published_date': '2017-05-02',
            'start_date': '2023-04-10',
            'finish_date': '2023-04-20',
            'format': 'Hardcover',
            'rating': 4.0,
            'status': 'read',
            'thoughts': 'An exciting adventure with clever puzzles and engaging characters.'
        },
        {
            'id': 2,
            'title': 'King of Wrath',
            'author': 'Ana Huang',
            'cover_image': 'https://hachette.imgix.net/books/9780349436326.jpg?auto=compress',   
         'fallback_image': 'https://via.placeholder.com/300x450?text=King+of+Wrath',
            'description': 'A billionaire romance with high stakes and intense emotions.',
            'genre': 'Romance, Contemporary',
            'pages': 384,
            'published_date': '2022-10-25',
            'start_date': '2023-05-01',
            'finish_date': '2023-05-10',
            'format': 'Paperback',
            'rating': 4.5,
            'status': 'read',
            'thoughts': 'A steamy romance with great character development and emotional depth.'
        },
        {
            'id': 3,
            'title': 'It Ends With Us',
            'author': 'Colleen Hoover',
            'cover_image': 'https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg',
            'fallback_image': 'https://via.placeholder.com/300x450?text=It+Ends+With+Us',
            'description': 'A powerful story about love, courage, and hope in the face of difficult choices.',
            'genre': 'Contemporary, Romance',
            'pages': 384,
            'published_date': '2016-08-02',
            'start_date': '2023-06-15',
            'finish_date': '2023-06-25',
            'format': 'Paperback',
            'rating': 4.0,
            'status': 'read',
            'thoughts': 'A heart-wrenching and emotional story that stays with you long after reading.'
        },
        {
            'id': 4,
            'title': 'The Silent Patient',
            'author': 'Alex Michaelides',
            'cover_image': 'https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg',
            'fallback_image': 'https://via.placeholder.com/300x450?text=The+Silent+Patient',
            'description': 'A psychological thriller about a woman who shoots her husband and then stops speaking.',
            'genre': 'Thriller, Mystery',
            'pages': 336,
            'published_date': '2019-02-05',
            'start_date': '2023-07-10',
            'finish_date': '2023-07-20',
            'format': 'Hardcover',
            'rating': 4.5,
            'status': 'read',
            'thoughts': 'A gripping page-turner with an incredible twist that I never saw coming.'
        },
        {
            'id': 5,
            'title': 'Atomic Habits',
            'author': 'James Clear',
            'cover_image': 'https://covers.openlibrary.org/b/isbn/9781847941831-L.jpg',
            'fallback_image': 'https://via.placeholder.com/300x450?text=Atomic+Habits',
            'description': 'A comprehensive guide on how to build good habits and break bad ones.',
            'genre': 'Self-Help',
            'pages': 320,
            'published_date': '2018-10-16',
            'start_date': '2023-01-15',
            'finish_date': '2023-02-01',
            'format': 'Paperback',
            'rating': 5,
            'status': 'read',
            'thoughts': 'An excellent book that provides practical strategies for building good habits and breaking bad ones. The concepts are well-explained and actionable.'
        }
    ],    
}

    
    
# After the PORTFOLIO_DATA is fully defined, update the reading hobby with book data
reading_hobby = next((h for h in PORTFOLIO_DATA['hobbies'] if h['name'] == 'Reading'), None)
if reading_hobby:
    reading_hobby['books'] = PORTFOLIO_DATA['books']

@app.route('/')
def home():
    return render_template('index.html', data=PORTFOLIO_DATA)

@app.route('/about')
def about():
    return render_template('about.html', data=PORTFOLIO_DATA)

@app.route('/projects')
def projects():
    return render_template('projects.html', data=PORTFOLIO_DATA)
@app.route('/education')
def education():
    return render_template('education.html', data=PORTFOLIO_DATA)
    
@app.route('/books')
def books():
    return render_template('books.html', data=PORTFOLIO_DATA, books=PORTFOLIO_DATA['books'])

@app.route('/books/<int:book_id>')
def book_detail(book_id):
    book = next((book for book in PORTFOLIO_DATA['books'] if book['id'] == book_id), None)
    if book is None:
        abort(404)
    return render_template('book_detail.html', book=book, data=PORTFOLIO_DATA)

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html', data=PORTFOLIO_DATA), 404

@app.errorhandler(500)
def internal_error(error):
    app.logger.error(f'Server Error: {error}', exc_info=True)
    return render_template('errors/500.html', data=PORTFOLIO_DATA), 500

@app.errorhandler(403)
def forbidden_error(error):
    return render_template('errors/403.html', data=PORTFOLIO_DATA), 403

@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify(error="ratelimit exceeded", message=str(e.description)), 429

# Health check endpoint
@app.route('/health')
def health_check():
    return jsonify(status='healthy', timestamp=datetime.utcnow())

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5001)


