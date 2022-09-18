dict1={'name':'amd','price':120,'tradable':'yes'}


class Assets():
    def __init__ ( self, dict1): #constructor of variables
        for key,value in dict1.items():
            setattr(self,key,value)

list={[1,2],[2,3]}

for item,item1 in list:
    print(item,item1)
  

assets=Assets(dict1)
print(assets.name, assets.price, assets.tradable)


from splinter import Browser


website=Browser()
website.find









