import os
import glob

replacements = {
    "--color-surface-primary": "--color-bg-primary",
    "--color-surface-secondary": "--color-bg-tertiary",
    "--color-surface-muted": "--color-bg-secondary",
    "--color-surface-contrast": "--color-bg-inverse",
    "--color-surface-tint": "--color-bg-tint",
    "--color-header-surface": "--color-bg-header",
    "--color-icon-surface": "--color-bg-icon",
    "--color-icon-foreground": "--color-icon-inverse",
    "--color-black": "--color-static-black",
    "--color-overlay": "--color-bg-overlay"
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.css', '.html')):
            process_file(os.path.join(root, file))

print("Done!")
