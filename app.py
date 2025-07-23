from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    # Aquí se muestra la página principal con la información que quieras desplegar
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
