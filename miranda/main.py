from test import CountyWellManager

manager = CountyWellManager() # Intantiate a CountyWellManager object
manager.get_counties_and_states_wells() # Read the CSV for counties and wells
manager.group_counties_and_wells_and_write_data() # Group the counties with their well ids
