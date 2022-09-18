stocks=[1,2,3,4,5]
dict1={}
for stock in stocks:
    keyvalue = {"'"+str(stock)+"'":'url'}
    dict1.update(keyvalue)
    print('working')
    print(stock)
    print(keyvalue)
print(dict1)