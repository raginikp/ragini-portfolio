#!/usr/bin/env python3
"""
Run script for Ragini's Portfolio Website
Simple script to start the Flask development server
"""

import os
import sys
from app import app

def main():
    """Main function to run the Flask application"""
    
    # Set environment variables for development
    os.environ['FLASK_ENV'] = 'development'
    os.environ['FLASK_DEBUG'] = '1'
    os.environ['FLASK_APP'] = 'app.py'
    
    print("🚀 Starting Ragini's Portfolio Website...")
    print("📍 Server will be available at: http://127.0.0.1:5001")
    print("🔄 Debug mode is enabled - server will auto-reload on changes")
    print("⏹️  Press Ctrl+C to stop the server\n")
    
    try:
        # Run the Flask development server on port 5001
        app.run(host='127.0.0.1', port=5001, debug=True, use_reloader=True)
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        print("\nTroubleshooting steps:")
        print("1. Make sure no other application is using port 5001")
        print("2. Check your firewall settings")
        print("3. Try running the server on a different port by changing the port number in run.py")
        print("4. Make sure all required packages are installed (run 'pip install -r requirements.txt')")
        return 1
    return 0

if __name__ == '__main__':
    sys.exit(main())