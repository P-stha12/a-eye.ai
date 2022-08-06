# a-eye.ai
An AI to take care of your eye.


# Introduction

Early ocular illness identification is a cost-efficient and reliable technique to stop blindness brought on by conditions including diabetes, glaucoma, cataracts, and many others. The World Health Organization (WHO) estimates that there are currently at least 2.2 billion vision impairments worldwide, of which at least 1 billion might have been avoided. In order to lessen the strain of the ophthalmologist and save patients' vision from being damaged, rapid and automatic illness diagnosis is essential and urgent. Following the provision of high-quality medical eye fundus photos, computer vision and deep learning may automatically identify ocular disorders.


# Dataset
Ocular Disease Intelligent Recognition (ODIR) is a structured ophthalmic database of 5,000 patients with age, color fundus photographs from left and right eyes and diagnostic keywords from doctors.

This dataset is meant to represent ‘‘real-life’’ set of patient information collected by Shanggong Medical Technology Co., Ltd. from different hospitals/medical centers in China. In these institutions, fundus images are captured by various cameras in the market, such as Canon, Zeiss and Kowa, resulting into varied image resolutions.
Annotations were labeled by trained human readers with quality control management. Patients are classified into various labels, where we have used the following 5:

1. Normal (N)
2. Diabetes (D)
3. Glaucoma (G)
4. Cataract (C)
5. Other diseases/abnormalities (O)

https://www.kaggle.com/datasets/andrewmvd/ocular-disease-recognition-odir5k

# Normal (N)
Healthy eye:
![image](https://user-images.githubusercontent.com/83496813/183237522-aa147eba-3bcb-4d36-baa6-bbdcdce9c885.png)

# Diabetes (D)

Diabetes is an extremely serious condition that can lead to amputations, heart disease, renal failure, and blindness, among other issues. You may manage diabetes by taking good care of your health with a balanced diet, frequent exercise, and taking your prescribed medications. Diabetic retinopathy is the name for the condition where diabetes affects the eyes.

Every year, all diabetics should undergo an eye exam using pupil dilation or a photo-screening equipment. An examination with pupil dilation should be carried out for follow-up at varying frequencies as soon as the illness (diabetic retinopathy) is visible in the eyes.

![image](https://user-images.githubusercontent.com/83496813/183237104-2801e1d3-dcdf-486a-ae9c-4fa5490d5b0b.png)

# Glaucoma (G)

Glaucoma is an eye disease that irreversibly and permanently affects the optic nerve (structural damage). The optic nerve is the part of the eye through which passes all the visual information captured by the eye. This information travels through the optic nerve and is transmitted to the brain.

Glaucoma is a very common disease that affects people of all ages. According to sources, it is estimated that up to 10% of the population would be affected. In Canada, this number represents 250,000 people. Globally, this represents 65 million people.

![image](https://user-images.githubusercontent.com/83496813/183237163-2f54290a-7a19-4426-9cff-f311c9154f2e.png)

# Cataract (C)

A cataract is a clouding of the eye's natural lens, called the lens. The latter is located inside the eye, behind the iris, which represents the colored part forming the pupil. The diagram of the anatomy of the eye shows it well. Several factors, including age, heredity, medication and environment, contribute to the formation of cataracts. Over time, the lens becomes frosty, yellowish and hazy. The light passing through this lens is therefore altered and diminished by the cataract. Cataract extraction is an intraocular surgical procedure that can permanently treat this condition.

![image](https://user-images.githubusercontent.com/83496813/183237216-27385f25-50dd-4e16-bc32-ee6aacd243a4.png)

# Other diseases/abnormalities (O)
1. Amblyopia
2. Strabismus
3. Retinal Detachment and so on.

# Dataset Images Examples:

Glaucoma                   |  Cataract
:-------------------------:|:-------------------------:
![43_right](https://user-images.githubusercontent.com/83496813/183260534-74799061-67fd-4e31-8ec5-abccd7ebc132.jpg) |  ![81_left](https://user-images.githubusercontent.com/83496813/183260539-fe388a3f-8418-45c8-a5b0-0a9e3af6ba7a.jpg)


Diabetes                   |  Myopia
:-------------------------:|:-------------------------:
![1994_right](https://user-images.githubusercontent.com/83496813/183260544-cb8b64f4-07fb-4e42-98cc-3684edab43b5.jpg)  |  ![39_left](https://user-images.githubusercontent.com/83496813/183260556-018a602d-b917-488f-8e5d-1f97f8617df6.jpg)



# ML Approaches (accuracy)


Resnet50 ( 0.60)          |  vgg16 (0.75)
:------------------------:|:-------------------------:
![image](https://user-images.githubusercontent.com/83496813/183260986-a1dfa17f-8030-4458-9fab-8833e3062663.png) |  ![image](https://user-images.githubusercontent.com/83496813/183260873-605ad20f-e271-41a4-81f2-d5794b51fe00.png)


vgg19(0.88)                |  CNN(Sequential: 0.45)
:-------------------------:|:-------------------------:
![image](https://user-images.githubusercontent.com/83496813/183260913-003d4b08-e36d-4257-a782-96318197ed3a.png) |  ![image](https://user-images.githubusercontent.com/83496813/183261394-d4575b16-9c85-469d-ae8a-bc938c9f0dcc.png)


# UI

1                          |  2
:-------------------------:|:-------------------------:
![297806256_5329305510509985_3748246590630107530_n](https://user-images.githubusercontent.com/83496813/183260304-9ec46b79-b217-4ef8-89b8-a7e180b34eb2.png) |  ![297798606_581235233442517_611944687425387908_n](https://user-images.githubusercontent.com/83496813/183260318-e8d42fa2-df0a-459d-aa62-acbb3b3a45d7.png)


3                          |  4
:-------------------------:|:-------------------------:
![297493707_787784795694290_7814490296017445167_n](https://user-images.githubusercontent.com/83496813/183260330-e4183d6d-b1a3-4ba1-8b93-582f26c1119b.png)  |  ![296912725_588262166008766_8769017134642947979_n](https://user-images.githubusercontent.com/83496813/183260336-f9d2d442-8531-4fa8-9e08-fec8c53031a2.png)



