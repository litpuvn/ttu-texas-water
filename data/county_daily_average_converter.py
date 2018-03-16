import csv
from collections import defaultdict


class CountyWellManager:
    # Organize counties and its associated wells
    def __init__(self):
        self.csv_input = []  # Where the csv data is going to be stored for grouping
        self.csv_counties = []  # Where unique counties are going to be stored
        self.res = defaultdict(list)  # To group counties and their well id's

        self.data_from_id_file = []  # An array of tuples that will be reset after an id file has been read
        self.well_data_by_id = defaultdict(list)  # To group dates and their temperatures for each well id
        self.well_dates = []  # A list to store the dates for indexing
        self.write_data = []  # A list to store a list that will contain a date at index 0 and an average at index 1

    # Rename function xD
    def get_counties_and_states_wells(self):
        current_file = 'wells' + ".csv"

        with open(current_file) as csvfile:
            # Processing the CSV
            my_reader = csv.reader(csvfile, delimiter=',')
            header = True  # Need to read the header
            for id_line in my_reader:  # Read the header
                if header == True:
                    header = False  # Dont need to red the header anymore
                    continue
                current_county = id_line[0]  # Item in current row at column 0
                current_well = id_line[1]  # Item in current row at column 1
                if current_county not in self.csv_counties:
                    # This is much better than manually typing county names
                    self.csv_counties.append(current_county)  # If the current county does not exist within the class attribute, add it

                active_status = id_line[10]  # CHECK IF ITS ACTIVE!
                if active_status == "Active":  # ONLY ADD IT TO PARSE LIST IF ACTIVE
                    a_group = (id_line[0], str(current_well))  # Group them into a tuple
                    self.csv_input.append(a_group)  # Add them to a list for group_counties_and_wells

    # This one too xD
    def group_counties_and_wells_and_write_data(self):
        for county, wellId in self.csv_input:
            self.res[county].append(wellId)  # For every county, add every identity to a defaultdict

        """UNCOMMENT THIS PRINT STATEMENT IF YOU WANT TO VALIDATE THAT ONLY 'Active' WELLS ARE BEING PARSED"""
        # print(self.res)

        for county in self.csv_counties:
            print("Reading data for county: {}".format(county))
            current_well_file = 'counties/' + str(county).lower() + "-daily.csv"  # Where are we going to WRITE to

            for well_id in self.res[county]:  # For every well ID associated with a county
                print("\tBegin reading data for well: {} ".format(well_id))
                if len(well_id) is not 7:
                    print("\tWARNING: Well with ID {} in county {} had a 0 stripped during initial reading. Padding with leading zero.".format(
                            well_id, county))
                    well_id = '0' + well_id  # pad a 0 to the front of the ID since all of the files are 7 digits long

                parse_well_file = 'detail/' + str(well_id) + "-daily.csv"  # Where are we going to READ dates from to find averages
                print("\t\t Reading data for well {} from {}".format(well_id, parse_well_file))
                with open(parse_well_file, "r+") as parsing_well_data:

                    # Read the CSV using the same process
                    well_data_reader = csv.reader(parsing_well_data, delimiter=',')
                    header = True  # Need to read the header
                    for line in well_data_reader:
                        if header == True:  # Read the header
                            header = False  # Dont need to read the header anymore
                            continue
                        date = str(line[0][0:10])
                        if date not in self.well_dates:  # Add the dates to an array
                            self.well_dates.append(date)

                        b_group = (date, float(line[1]))  # Add date and water level
                        self.data_from_id_file.append(b_group)

            # After we have read ALL of the wells for a county
            for date, water_level in self.data_from_id_file:
                self.well_data_by_id[date].append(water_level)  # Every date across all well CSVs will be become the key of the dict and their values with be ALL of the temperatures

            for date in self.well_dates:
                current_date_water_levels = self.well_data_by_id[date]
                self.write_data.append([date, (sum(current_date_water_levels) / len(
                    current_date_water_levels))])  # Sum the values in the list, divide them by the number of values in the list for the average

            """UNCOMMENT THIS PRINT STATEMENT IF YOU WANT TO VALIDATE THAT ALL OF THE CORRECT WATER LEVELS ARE BEING READ FOR EACH COUNTY, FOR EACH WELL, FOR EACH DAY"""
            # print(self.well_data_by_id)

            # We're done with the county, just need to write, reset vars that will be used for the next county
            self.well_dates = []
            self.data_from_id_file = []
            self.well_data_by_id = defaultdict(list)  # FORGOT TO RESET THIS OOPS

            # Now we need to write the data to a CSV
            with open(current_well_file, 'w', newline="", encoding="utf-8") as write_county_data_file:
                county_data_writer = csv.DictWriter(write_county_data_file, fieldnames=["datetime", "average_water_level"],
                                                    delimiter=',')
                county_data_writer.writeheader()
                for item in self.write_data:
                    county_data_writer.writerow({"datetime": item[0], "average_water_level": item[1]})
                write_county_data_file.flush()  # To be safe -_-
                write_county_data_file.close()  # To be smart o_o
                print("Completed writing data to {}\n".format(current_well_file))
                print("=" * 100)
            # Reset data store
            self.write_data = []


if __name__ == '__main__':

    manager = CountyWellManager() # Intantiate a CountyWellManager object
    manager.get_counties_and_states_wells() # Read the CSV for counties and wells
    manager.group_counties_and_wells_and_write_data() # Group the counties with their well ids