import csv

INPUT_FILE = 'test.csv'
OUTPUT_FILE = 'out.csv'

with open(OUTPUT_FILE, mode='w') as file:
    writer = csv.writer(file, quoting=csv.QUOTE_ALL)


    headers = ["Time", "Event", "Location"]
    writer.writerow(headers)

    with open(INPUT_FILE, mode='r') as file:
        reader = csv.reader(file, delimiter='~')

        counter = 0
        line = []
        for row in reader:

            if counter%4 < 2:
                line.append(row[0])

            elif counter%4 == 3:
                line.append(row[0].split(" in ")[-1])
                writer.writerow(line)
                line = list()

            counter += 1

