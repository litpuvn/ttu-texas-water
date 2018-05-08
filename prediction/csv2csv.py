import csv

input = 'well_712401.csv'

output = input.replace('.', '.out.')
outputFieldnames = ['date', 'SaturatedThickness']

with open(input, newline='') as csvfile:
    reader = csv.DictReader(csvfile)

    with open(output, 'w', newline='') as csvOutputFile:
        writer = csv.DictWriter(csvOutputFile, fieldnames=outputFieldnames)
        writer.writeheader()

        for row in reader:

            newRow = {}
            for field in outputFieldnames:
                if field == 'date':
                    newRow[field] = row['MeasurementYear'] + '-' + row['MeasurementMonth'] + '-' + row['MeasurementDay']
                else:
                    newRow[field] = row[field]

            writer.writerow(newRow)
