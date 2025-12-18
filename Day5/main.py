import flask
import sqlite3

app = flask.Flask(
    __name__,
    static_folder="static",
    static_url_path="/"
)
conn = sqlite3.connect("names.db")
cursor = conn.cursor()
cursor.execute('''
                     CREATE TABLE IF NOT EXISTS names (
                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                         name TEXT NOT NULL,
                         gift TEXT NOT NULL
                     )
                     ''')
conn.commit()
conn.close()


@app.get("/")
def index():
    return flask.send_from_directory("static", "index.html")


@app.get("/api/names")
def get_names():
    conn = sqlite3.connect("names.db")
    cursor = conn.cursor()
    cursor.execute('SELECT id, name, gift FROM names')
    rows = cursor.fetchall()
    conn.close()

    names = [{'id': row[0], 'name': row[1], 'gift': row[2]} for row in rows]
    return flask.jsonify(names)


@app.post("/api/names")
def create_name():
    data = flask.request.get_json()
    name = data.get("name")
    gift = data.get("gift")

    conn = sqlite3.connect("names.db")
    cursor = conn.cursor()
    cmd = f'''INSERT INTO names (name, gift) VALUES ("{name}", "{gift}")'''
    print(cmd)
    cursor.execute(cmd)
    # uid = cursor.lastrowid

    conn.commit()
    conn.close()

    return flask.jsonify({"success": True, "ID": "uid"})


if __name__ == "__main__":
    app.run()
