import os

target_dir = r"c:\Users\manhpc\Documents\python project\test1\710-231A290052-"

# Emojis used in the UI
emojis = ['🛒', '📝', '⏱️', '📚', '📄', '🎓', '📋', '🌐', '📌', '🔗', '🚀', '✓', '⏰', '💻', '🔍']

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the remaining generic MSSV
    new_content = content.replace("710-MSSV", "710-231A290052")
    
    # Also fix some specific layout occurrences to make it cleaner without emojis
    for e in emojis:
        # If emoji is right next to text
        new_content = new_content.replace(e + " ", "")
        new_content = new_content.replace(" " + e, "")
        new_content = new_content.replace(e, "")
    
    # Extra fixups since empty tags might occur
    new_content = new_content.replace('<div class="modal-icon success"></div>', '<div class="modal-icon success">Thành công</div>')
    new_content = new_content.replace('<div class="modal-icon warning"></div>', '<div class="modal-icon warning">Hết giờ</div>')

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")

for root, _, files in os.walk(target_dir):
    if ".git" in root or "node_modules" in root:
        continue
    for file in files:
        if file.endswith('.html') or file.endswith('.js') or file.endswith('.css') or file.endswith('.md'):
            clean_file(os.path.join(root, file))
