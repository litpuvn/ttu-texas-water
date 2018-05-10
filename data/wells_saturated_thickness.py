import csv
import glob, os
from os import listdir
from os.path import isfile, join

if __name__ == '__main__':
    ## read wells

    well_ids = {}
    mypath = "detail"
    found_ids = {}

    county_well = dict()

    with open('well_data_full.csv') as csvfile:
        well_reader = csv.DictReader(csvfile)

        for r in well_reader:
            id = r["Well_ID"]
            if len(id) < 7:
                id = '0' + id

            r["Well_ID"] = id

            county = r['County']
            if county not in county_well:
                county_well[county] = dict()

            wells_in_county = county_well[county]

            if id not in wells_in_county:
                wells_in_county[id] = []

            # append time series data
            well_timeseries = wells_in_county[id]
            well_timeseries.append(r)

        # remove wells with few data

            # if id not in well_ids:
            #     well_ids[id] = r

        with open('reduced_well_data.csv', 'w', newline='') as write_csv_file_pointer:
            csv_writer = csv.writer(write_csv_file_pointer, delimiter=',')
            csv_writer.writerow(['id', 'latitude', 'longitude', 'aquifer', 'county', 'water_level', 'day', 'month', 'year', 'active'])

            for county, wells in county_well.items():
                # ignore data from some county
                if county in ['Runnels']:
                    continue
                accepted_county_well_count = 0
                for id, series in wells.items():
                    # ignore the well if its timeseries is too short
                    if len(series) < 10:
                        continue

                    accepted_county_well_count = accepted_county_well_count + 1
                    for w in series:
                        water_level = w['SaturatedThickness']
                        lat = w['y_lat']
                        lon = w['x_long']
                        aquifer = 'Ogallala'
                        county = w['County']
                        active = 'active'
                        day = w['MeasurementDay']
                        if len(day) < 2:
                            day = '0' + day
                        mon = w['MeasurementMonth']
                        if len(mon) < 2:
                            mon = '0' + mon

                        year = w['MeasurementYear']

                        csv_writer.writerow([id, lat, lon, aquifer, county, water_level, day, mon, year])

                    if accepted_county_well_count > 19:
                        break
                # id: wellId,
                # water_level: row['daily_high_water_level'],
                # latitude: Number(row['latitude']),
                # longitude: Number(row['longitude']),
                # aquifer: row['aquifer'],
                # county: row['county'],
                # active: 'Active' == = row['active']


                # onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
        # total_water_index_well = 0
        # for f in onlyfiles:
        #     if not f.endswith('-daily.csv'):
        #         id = f[0:f.index('.')]
        #         if id in well_ids:
        #             found_ids[id] = True
        #             w = well_ids[id]
        #             print("Well " + id + "; county: " + w['County'])
        #
        # print("Found total wells in research:" + str(len(onlyfiles)/2))
        # print("Found total wells in research that have saturated thickness:" + str(len(found_ids)))
        # print("Found total wells that have saturated thickness:" + str(len(well_ids)))