import os, re
import sys

# Define search terms and paths
search_terms = re.compile(r'(?i)\b(shuffle(r)?)\b')
paths = ['frontend/src', 'frontend/public', 'backend/go-app', 'docker-compose.yml']

# Paths or string patterns to ignore to reduce noise (e.g. github imports)
ignore_patterns = [
    re.compile(r'github\.com/frikky/Shuffle'),
    re.compile(r'github\.com/shuffle/'),
    re.compile(r'ghcr\.io/shuffle/'),
    re.compile(r'shuffle-frontend'),
    re.compile(r'shuffle-backend'),
    re.compile(r'shuffle-orborus'),
    re.compile(r'shuffle-opensearch'),
    re.compile(r'shuffle-cache'),
    re.compile(r'shuffle-database'),
    re.compile(r'shuffle-cluster'),
    re.compile(r'shuffle-apps'),
    re.compile(r'shuffle-files'),
    re.compile(r'shuffle-worker'),
    re.compile(r'package\.json'),
    re.compile(r'package-lock\.json')
]

results = []

for root_path in paths:
    if os.path.isfile(root_path):
        files_to_check = [root_path]
    else:
        files_to_check = []
        for dirpath, _, filenames in os.walk(root_path):
            if 'node_modules' in dirpath or '.git' in dirpath or '.next' in dirpath:
                continue
            for f in filenames:
                if f.endswith(('.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.go', '.yml', '.yaml')):
                    files_to_check.append(os.path.join(dirpath, f))

    for filepath in files_to_check:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                lines = f.readlines()
        except:
            continue
            
        for line_no, line in enumerate(lines, 1):
            if search_terms.search(line):
                should_ignore = False
                for pattern in ignore_patterns:
                    if pattern.search(line) or pattern.search(filepath):
                        should_ignore = True
                        break
                
                if not should_ignore:
                    clean_line = line.strip()
                    if len(clean_line) > 120:
                        clean_line = clean_line[:120] + '...'
                    results.append(f'- **{filepath}:{line_no}**: `{clean_line}`')

artifact_path = r'c:\Users\manav\.gemini\antigravity\brain\caea5211-3f72-4c63-86af-94d1a1ae4f29\remaining_shuffle_references.md'
with open(artifact_path, 'w', encoding='utf-8') as f:
    f.write('# Remaining occurrences of Shuffle/shuffler\n\n')
    f.write('These occurrences match the words "Shuffle" or "shuffler" (case-insensitive) but exclude common code references like github imports or container names.\n\n')
    if results:
        f.write('\n'.join(results))
    else:
        f.write('No user-visible mentions found!\n')

print(f'{len(results)} remaining occurrences found.')
