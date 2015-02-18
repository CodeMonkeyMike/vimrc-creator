
with open('options.txt', 'r') as f, open('out.txt', 'w') as g:
    for x in f:
        x = x.rstrip()
        if not x: continue
        line = [c.strip() for c in x.split('\'')]
        totalLine = '"' + line[1] + '": {'
        if len(line) > 3:
            if 0 < len(line[3]) < 10:
                totalLine += '"short": "' + line[3] + '"'
                totalLine += ', "explanation": "' + x[len(''.join([line[1], line[3]]))+10:].strip().replace('"', "'") + '"},'
        else:
            totalLine += '"short": ""'
            totalLine += ', "explanation": "' + x[len(''.join([line[1]]))+4:].strip().replace('"', "'") + '"},'
        g.write(totalLine + "\n")

print("ello")
