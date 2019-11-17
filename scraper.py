import time
from pandas import DataFrame
import requests
from bs4 import BeautifulSoup

dog_description = []

# for i in dog_breed_clean_dashed:
#     single_dog_page = "https://dogtime.com/dog-breeds/{}".format(i)

single_dog_page = "https://dogtime.com/dog-breeds/xoloitzuintli"
page = requests.get(single_dog_page)
page.text
soup = BeautifulSoup(page.text, "html.parser")
dog_description_class = soup.find(
    class_="breed-data-item-content js-breed-data-section"
)
dog_description.append(dog_description_class)


dog_description_no_html = []
for item in dog_description:
    dog_description_no_html.append(item.text)

# print(dog_description_no_html)

# Get dogs images
dog_img = []
#  Uncomment this two lines below to run a loop. Keep commented if you only want to get one dog information
# for i in dog_breed_clean_dashed:
#     single_dog_page = 'https://dogtime.com/dog-breeds/{}'.format(i)

single_dog_page = "https://dogtime.com/dog-breeds/xoloitzuintli"
page = requests.get(single_dog_page)
page.text
soup = BeautifulSoup(page.text, "html.parser")
dog_description_class = soup.find(class_="breed-featured-img").get("src")
dog_img.append(dog_description_class)

# print(dog_img)

# dog_breed = []

# single_dog_page = "https://dogtime.com/dog-breeds/profiles"
# #     single_dog_page = 'https://www.akc.org/dog-breeds/{}'.format(i)
# page = requests.get(single_dog_page)
# page.text
# soup = BeautifulSoup(page.text, "html.parser")
# dog_description_class = soup.find_all(class_="list-item-title")
# dog_breed.append(dog_description_class)

# print(dog_breed)

# Using a double loop to get rid of the nested array
# dog_breed_single = []
# for i in dog_breed:
#     for item in i:
#         dog_breed_single.append(item)
# print(dog_breed_single)

# use this loop to remove inesesary html
# dog_breed_clean = []
# for item in dog_breed_single:
#     dog_breed_clean.append(item.text)

# print(dog_breed_clean)


#  This code helps you to clean the data if there is unwanted letters, special characters or spaces
# dog_breed_clean_dashed = []
# for i in dog_breed_clean:
#     j = i.replace(' ', '-')
#     dog_breed_clean_dashed.append(j)
# print(dog_breed_clean_dashed)


Data = {"image": dog_img, "description": dog_description_no_html}

df = DataFrame(Data, columns=["image", "description"])

print(df)

Export = df.to_csv("dog-db3.csv")
