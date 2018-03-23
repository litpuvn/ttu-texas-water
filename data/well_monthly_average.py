import csv
import glob, os
import logging


def calculate_average(water_level, count):
    return round(water_level / count, 2)


def get_files_in_directory(current_dir):
    os.chdir(current_dir)

    return glob.glob("*.csv")


def get_water_level(row):
    if 'daily_high_water_level(ft below land surface)' in row:
        return float(row['daily_high_water_level(ft below land surface)'])

    return float(row['water_level(ft below land surface)'])


def create_monthly_well_data(well_id):
    with open('detail/' + str(well_id) + '-daily.csv') as csvfile:
        output_file_name = str(well_id) + '-monthly.csv'
        output_file_pointer = open(output_file_name, 'w')

        fieldnames = ['datetime', 'water_level(ft below land surface)']
        writer = csv.DictWriter(output_file_pointer, fieldnames=fieldnames)
        start_month = None
        accumulative_water_level = 0
        count = 0
        reader = csv.DictReader(csvfile)
        header_row = True

        for row in reader:
            if header_row:
                writer.writeheader()
                header_row = False
                continue

            current_month = row['datetime'][:7]

            if start_month == current_month:
                accumulative_water_level += get_water_level(row)
                count = count + 1
            else:

                if count > 0:
                    avg = calculate_average(accumulative_water_level, count)
                    writer.writerow({fieldnames[0]: start_month, fieldnames[1]: avg})

                accumulative_water_level = get_water_level(row)
                start_month = current_month
                count = 1

        avg = calculate_average(accumulative_water_level, count)
        writer.writerow({fieldnames[0]: start_month, fieldnames[1]: avg})


if __name__ == '__main__':
    well_id = '0712401'
    create_monthly_well_data(well_id)
