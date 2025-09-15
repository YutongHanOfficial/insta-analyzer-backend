from flask import Flask, request, jsonify
from flask_cors import CORS
import instaloader

app = Flask(__name__)
CORS(app)

# Known political accounts
progressive_accounts = {"aoc", "berniesanders", "cnn", "gretathunberg", "npr", "ocasio2018"}
conservative_accounts = {"foxnews", "benshapiro", "prageru", "realcandaceo", "charliekirk11"}

@app.route("/analyze", methods=["POST"])
def analyze():
    username = request.json.get("username")

    loader = instaloader.Instaloader()

    try:
        profile = instaloader.Profile.from_username(loader.context, username)
        following = set(p.username.lower() for p in profile.get_followees())

        prog_score = len(following & progressive_accounts)
        cons_score = len(following & conservative_accounts)

        leaning = "Neutral"
        if prog_score > cons_score:
            leaning = "Leans Progressive"
        elif cons_score > prog_score:
            leaning = "Leans Conservative"

        return jsonify({
            "username": username,
            "progressive_score": prog_score,
            "conservative_score": cons_score,
            "leaning": leaning
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
