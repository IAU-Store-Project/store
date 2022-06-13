import json

f = open('countries+states+cities.json', 'r')

data = json.loads(f.read())

for x in data:
    if x.get('iso2') == 'TR':
        print(json.dumps(x))
        break

