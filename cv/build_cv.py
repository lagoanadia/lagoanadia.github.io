"""Genera Nadia_Lagoa_Vilela_CV.pdf (A4, una página, texto seleccionable para ATS).

Uso:  python3 build_cv.py
Requiere: pip install reportlab
"""
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, Frame, FrameBreak, PageTemplate,
                                Paragraph, Spacer, Table, TableStyle)

# ---------- Fuentes (TrueType embebidas: el texto se extrae bien en un ATS) ----------
FD = "/usr/share/fonts/truetype/liberation/"
pdfmetrics.registerFont(TTFont("Sans", FD + "LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Sans-Bold", FD + "LiberationSans-Bold.ttf"))
pdfmetrics.registerFontFamily("Sans", normal="Sans", bold="Sans-Bold")

TEAL = HexColor("#2C8A80")
NAVY = HexColor("#1B1F3B")
TEXT = HexColor("#222222")
GREY = HexColor("#555555")

W, H = A4
M = 34                      # margen lateral
LEFT_W, GAP = 246, 26       # ancho columna izquierda y separación
RIGHT_X = M + LEFT_W + GAP
RIGHT_W = W - M - RIGHT_X
COL_TOP, COL_BOTTOM = H - 132, 30

# ---------- Estilos ----------
def st(name, **kw):
    base = dict(fontName="Sans", fontSize=9, leading=12.4, textColor=TEXT)
    base.update(kw)
    return ParagraphStyle(name, **base)

body = st("body")
h_section = st("h", fontName="Sans-Bold", fontSize=11.5, leading=14, textColor=TEAL,
               spaceBefore=11, spaceAfter=0)
label = st("label", fontName="Sans-Bold")
job = st("job", fontName="Sans-Bold", fontSize=10, leading=13, textColor=NAVY, spaceBefore=6)
org = st("org", textColor=TEAL, leading=12)
date = st("date", fontSize=8.5, textColor=GREY, leading=11, spaceAfter=2)
bullet = st("bullet", leftIndent=9, bulletIndent=0, spaceAfter=2)
small = st("small", fontSize=8.5, textColor=GREY, leading=11)


def section(title, first=False):
    """Título de sección con línea inferior (Table de 1 celda)."""
    t = Table([[Paragraph(title, h_section)]], colWidths=[None])
    t.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, -1), 0.8, TEAL),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return ([] if first else [Spacer(1, 13)]) + [t, Spacer(1, 5)]


def rows(data, width, first=58):
    """Tabla etiqueta | valor."""
    t = Table([[Paragraph(a, label), Paragraph(b, body)] for a, b in data],
              colWidths=[first, width - first])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 1.6), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.6),
    ]))
    return t


def bullets(items):
    return [Paragraph(i, bullet, bulletText="•") for i in items]


# ---------- Contenido ----------
left = []
left += section("PERFIL", first=True)
left.append(Paragraph(
    "Estudiante de Desarrollo de Aplicaciones Multiplataforma (DAM), disponible para "
    "oportunidades. Llevo toda la vida traduciendo entre mundos; el código es el más "
    "nuevo. Criada en Suiza y multilingüe (gallego, español, inglés, alemán, francés), "
    "combino comunicación intercultural con desarrollo en Java, JavaScript, TypeScript, "
    "Python y SQL, y proyectos propios con React, Next.js y Node.js. Autodidacta y "
    "orientada a los fundamentos: me importa entender de verdad lo que construyo, no "
    "solo hacerlo funcionar.", body))

left += section("HABILIDADES TÉCNICAS")
left.append(rows([
    ("Lenguajes", "Java | JavaScript | TypeScript | HTML y CSS | Python | SQL"),
    ("Java", "POO, Swing, JDBC, JavaFX, Maven"),
    ("JavaScript", "DOM, Fetch API, async/await"),
    ("Frameworks", "React, Next.js, Node.js"),
    ("Python", "pandas, matplotlib, CustomTkinter, Ollama"),
    ("Bases datos", "SQL, MySQL, PostgreSQL"),
    ("IA aplicada", "RAG, integración de APIs de IA"),
    ("Herramientas", "Git, GitHub, IntelliJ IDEA, VS Code"),
    ("Portfolio", "nadia-lagoa.vercel.app"),
], LEFT_W, first=62))

left += section("IDIOMAS")
left.append(rows([
    ("Español", "Nativo"), ("Gallego", "Nativo"),
    ("Inglés", "Fluido — C1"), ("Alemán", "Fluido — C1"),
    ("Francés", "B2"), ("Italiano", "A2"), ("Sueco", "Básico"),
], LEFT_W, first=62))

left += section("EDUCACIÓN")
left += [
    Paragraph("<b>CFGS — Desarrollo de Aplicaciones Multiplataforma</b>",
              st("e1", textColor=NAVY, spaceBefore=2)),
    Paragraph("CHIOS Formación, A Coruña, España", org),
    Paragraph("2025 – 2027", date),
    Paragraph("<b>Bachillerato — Biología y Química</b>",
              st("e2", textColor=NAVY, spaceBefore=5)),
    Paragraph("Kantonsschule Sargans, Suiza", org),
    Paragraph("2020 – 2024", date),
]

left += section("HABILIDADES PERSONALES")
left.append(Paragraph(
    "Comunicación intercultural | Rendimiento bajo presión | Reconocimiento rápido de "
    "patrones | Aprendizaje autónomo | Adaptabilidad", body))

right = []
right += section("EXPERIENCIA LABORAL", first=True)
right += [
    Paragraph("Camarera", job), Paragraph("Jamonería El Pinar, A Coruña", org),
    Paragraph("10/2025 – Actualidad", date),
] + bullets([
    "Gestión autónoma de pedidos y cobros durante el turno completo.",
    "Resolución independiente de incidencias de forma rápida y efectiva.",
    "Comunicación y atención al detalle aplicables al soporte técnico y atención al usuario.",
])
right += [
    Paragraph("Camarera", job), Paragraph("Bar Plaia das Lanchas, Muxía", org),
    Paragraph("04/2025 – 09/2025", date),
] + bullets([
    "Resolución de problemas en tiempo real y comunicación con clientes bajo presión.",
    "Gestión de pedidos y cobros con precisión y rapidez.",
    "Trabajo en equipo eficaz en entornos de alta demanda.",
])
right += [
    Paragraph("Ayudante de Cocina", job), Paragraph("Restaurante A Furna, Muxía", org),
    Paragraph("09/2024 – 04/2025", date),
] + bullets([
    "Mantenimiento del orden y la eficiencia en cocina dinámica.",
    "Coordinación con el equipo para la gestión simultánea de tareas.",
    "Desarrollo de disciplina profesional, puntualidad y responsabilidad.",
])

right += section("PROYECTOS")
proj = [
    ("Synaptic", "Next.js, TypeScript, PostgreSQL, IA",
     "App de aprendizaje instalable (PWA): captura de notas en texto, imagen o voz "
     "organizadas por IA, búsqueda de texto completo, chat RAG sobre tus notas y "
     "flashcards con repetición espaciada. Desarrollo individual de principio a fin.",
     "synaptic-ruby.vercel.app"),
    ("Larder — Proyecto Transversal", "React, TypeScript",
     "App de nevera compartida cuya lista de la compra se genera sola a partir de lo "
     "que hay en la nevera. Proyecto Transversal de 2º DAM.",
     "lagoanadia.github.io/larder"),
    ("Kook", "React, Node.js, IA",
     "Buscador de recetas que convierte los ingredientes sueltos de la nevera en "
     "recetas reales, con consejos de cocina generados por IA.",
     "kook-psi.vercel.app"),
    ("Proyecto X", "Java, POO",
     "App de gestión de tareas del hogar basada en principios de programación "
     "orientada a objetos.",
     "github.com/lagoanadia/Proyecto-X"),
]
for name, stack, desc, url in proj:
    right += [
        Paragraph(f"{name} <font name='Sans' size='8.5' color='#2C8A80'>| {stack}</font>",
                  st("pj" + name, fontName="Sans-Bold", textColor=NAVY, spaceBefore=5,
                     leading=12)),
        Paragraph(desc, st("pd" + name, spaceAfter=1)),
        Paragraph(url, small),
    ]


# ---------- Página: cabecera + dos columnas ----------
def draw_header(c, doc):
    c.saveState()
    # foto circular
    r, cx, cy = 29, M + 29, H - 62
    p = c.beginPath(); p.circle(cx, cy, r); c.clipPath(p, stroke=0, fill=0)
    c.drawImage("foto.png", cx - r, cy - r, 2 * r, 2 * r)
    c.restoreState()
    c.saveState()
    c.setFillColor(NAVY); c.setFont("Sans-Bold", 24)
    c.drawString(M + 72, H - 56, "Nadia Lagoa Vilela")
    c.setFillColor(TEAL); c.setFont("Sans", 11)
    c.drawString(M + 72, H - 73, "Estudiante de Desarrollo de Aplicaciones Multiplataforma (DAM)")
    c.setFillColor(GREY); c.setFont("Sans", 8.6)
    c.drawString(M + 72, H - 88,
                 "+34 613 597 453 | lagoanadia@gmail.com | A Coruña, España")
    c.drawString(M + 72, H - 100,
                 "nadia-lagoa.vercel.app | github.com/lagoanadia | linkedin.com/in/nadia-lagoa-vilela-a36a7b380")
    c.setStrokeColor(TEAL); c.setLineWidth(1)
    c.line(M, H - 112, W - M, H - 112)
    # separador vertical entre columnas
    c.setStrokeColor(HexColor("#DDDDDD")); c.setLineWidth(0.6)
    c.line(M + LEFT_W + GAP / 2, COL_BOTTOM, M + LEFT_W + GAP / 2, COL_TOP)
    c.restoreState()


doc = BaseDocTemplate(
    "Nadia_Lagoa_Vilela_CV.pdf", pagesize=A4, leftMargin=M, rightMargin=M,
    title="Nadia Lagoa Vilela - CV - Desarrollo de Aplicaciones Multiplataforma",
    author="Nadia Lagoa Vilela",
    subject="Currículum Vitae",
    keywords="Java, JavaScript, TypeScript, Python, SQL, React, Node.js, DAM",
)
h = COL_TOP - COL_BOTTOM
doc.addPageTemplates([PageTemplate(id="cv", onPage=draw_header, frames=[
    Frame(M, COL_BOTTOM, LEFT_W, h, id="izq", leftPadding=0, rightPadding=0,
          topPadding=0, bottomPadding=0),
    Frame(RIGHT_X, COL_BOTTOM, RIGHT_W, h, id="der", leftPadding=0, rightPadding=0,
          topPadding=0, bottomPadding=0),
])])
doc.build(left + [FrameBreak()] + right)
print("OK -> Nadia_Lagoa_Vilela_CV.pdf")
