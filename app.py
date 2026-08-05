import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World! from vk"

if __name__ == "__main__":
    # Use the PORT env var provided by Render (fallback to 5000 locally)
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
