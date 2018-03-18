import ast

times = dict()
last_date = None

terms_by_months = dict()
all_months = []

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

print(terms_by_months)
for term, monthly in terms_by_months.items():
    myData = []
    for month, freq in monthly.items():
        myData.append(freq)

    print(term + ": ", myData)


