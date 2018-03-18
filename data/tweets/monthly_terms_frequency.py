import ast

times = dict()
last_date = None

terms_by_months = dict()

month_orders = {
    '2017-01': 0,
    '2017-02': 1,
    '2017-03': 2,
    '2017-04': 3,
    '2017-05': 4,
    '2017-06': 5,
    '2017-07': 6,
    '2017-08': 7,
    '2017-09': 8,
    '2017-10': 9,
    '2017-11': 10,
    '2017-12': 11,
    '2018-01': 12,
    '2018-02': 13,
}
all_months = []

remove = [
    'january',
    'feb',
    'april',
    'february',
    'june',
    'year',
    'years',
    'txgisforum',
    'today',
    'tomorrow',
    'thanks',
    'thx',
    'texaswaterdays',
    'texaswaterday',
    'sept',
    'photo',
    'photos',
    'oct',
    'next',
    'may',
    'march',
    'instagram',
    'info',
    'gis',
    'false',
    'december',
    'day',
    'data',
    'created',
    'conrats',
    'comments',
    'center',
    'austin',
    'antonio'
    'august',
    'attend',
    'agency',
    'annual',
    'city',
    'cityofcc',
    'district',
    'early',
    'local',
    'made',
    'manager',
    'speaking',
    'regional',
    'swift',
    'system',
    'use',
    'using',
    'week',
    'word',
    'txwaterproud',
    'txwindmills',
    'txwatertowers',
    'txhistcomm',
    'txcoloradoriver',
    'txawwa',
    'appearance',
    'antonio',
    'aquifers',
    'august',
    'back',
    'capitol',
    'check',
    'congress',
    'great',
    'audit',
    'know',
    'join',
    'jeff',
    'need',
    'map',
    'leave',
    'planning',
    'public',
    'read',
    'fema',
    'flooding',
    'enjoyed',
    'bldg',
    'building',
    'study',
    'tower',
    'receive',
    'new',
    'job',
    'learn',
    'including',
    'holding',
    'hill',
    'free',
    'congrats',
    'conference',
    'workshop',
    'application',
    'warning',
    'answer',
    'assistance',
    'asr',
    'congressman',
    'discussing',
    'meeting',
    'mtg',
    'sfa',
    'training',
    'program',
    'resources',
    'report',
    'panel',
    'watercycle',
    'recovery',
    'rain',
    'rainwater',
    'held',
    'happy',
    'bluelegacy',
    'tnris',
    'award',
    'disaster',
    'funding',
    'provided',
    'register',
    'stop',
    'hurricane',
    'harvey',
    'protection',
    'flood',
    'approved',
    'plan'


]

with open('twdb_monthly_terms.txt') as lines:
    for l in lines:
        if l[0].isnumeric():
            l = l.strip('\n')
            last_date = l

            if l not in times:
                times[l] = dict()
                all_months.append(l)
        else:

            times[last_date] = ast.literal_eval(l)


for month, terms in times.items():
    for term_freq in terms:
        term = term_freq[0]
        freq = term_freq[1]
        if term not in terms_by_months:
            terms_by_months[term] = dict({m: 0 for m in all_months})

        current_term_month = terms_by_months[term]
        if month not in current_term_month:
            current_term_month[month] = 0

        current_term_month[month] += term_freq[1]

for key in remove:
    if key in terms_by_months:
        del terms_by_months[key]
# print(terms_by_months)
for term, monthly in terms_by_months.items():
    myData = []
    for m in month_orders:
        myData.append(0)

    for month, freq in monthly.items():
        idx = month_orders[month]

        myData[idx] += freq

    print('{label:\"' + term + '\", data: ', myData, '},')


