#author: Stefan Hansch
#Version: 05-04-2025

from decimal import Decimal
from random import random
import math
from scipy.stats import expon
import numpy as np
import csv

#init

#set File here
with open("./TestSet2.csv", 'r') as file:
    csvreader = csv.reader(file, delimiter=',')
    header = []
    header = next(csvreader)
    rows = []
    for row in csvreader:
            rows.append(row)
file.close()

matrix = np.array(rows)

x = 0
y=0

c1 = matrix.diagonal(offset=1)

print (c1)

c2 =  {}

c2 = c1.copy()

counter = {}

outputStr = ""
tiltarray = {}
for number, values in enumerate(c2):
        tiltarray[number] = False

for number, values in enumerate(c2):
          counter[number]= 0;
          outputStr = outputStr+str(header[number+1])+","
outputStr = outputStr+"\n";

T = 0


while (y<2):
        for number, values in enumerate(c2):
                counter[number]=0
        while (x<2):
                allPropability =0
                print("Recalibrating")
                r = random()
                r1 = Decimal(r)
                for number, values in enumerate(c2):
                        if (tiltarray[number]==False):
                                 allPropability = Decimal(allPropability) + Decimal(math.exp(Decimal((values))))
                                 print ("Gene: ", header[number+1], "singleP", math.exp(float(values)), "allPropability", allPropability)
                #randomSpecifiedTime is eventTime
                #RandomTimePeriod is observationTime
                #T is actual Time
                                 
                randomSpecifiedTime = Decimal(-1* Decimal(math.log(r1))/Decimal(allPropability))
                print ("eventTime: ", randomSpecifiedTime, "allPropability", allPropability)
                T = Decimal(T)+Decimal(randomSpecifiedTime)
                print ("aktuelle Zeit: ", T)
                RandomTimePeriod = expon.rvs(scale=1, size=1)

                print("time", T)
                print("RandomTimePeriod", RandomTimePeriod)
                while (T<RandomTimePeriod):
                        if (T>RandomTimePeriod):
                                print("Faulty", T)
                                break
                        if (randomSpecifiedTime<0):
                                print("Timetravel - Faulty", randomSpecifiedTime,"T",T, "r1", r1, "math.logr1", Decimal(math.log(r1)),"all", Decimal(allPropability))
                                for number, values in enumerate(c2):
                                        print( "gene", header[number+1], "allPropability", allPropability, "value", values,"tilt", tiltarray[number])
                        # find the increment T in time as (1/a0)*ln(1/r1)
                        print ("allProbability", allPropability)
                        singlePropability = {}


                        allPropability =0
                        for number, values in enumerate(c2):
                                if (tiltarray[number]==False):
                                      allPropability = Decimal(allPropability) + Decimal(math.exp(Decimal(values)))
                        if (allPropability!=0):
                                # Calculatepercentage
                                for number, values in enumerate(c2):
                                        if (tiltarray[number]==False):
                                                singlePropability[number] = Decimal(Decimal(math.exp(Decimal(values)))/Decimal(allPropability))
                                                print("gene", header[number+1],"single, after Reset", singlePropability[number],"math.exp", math.exp(float(values)), "allPropability", allPropability)
                                        if (tiltarray[number]==True):
                                                singlePropability[number] = 0
                                                print("Tilt gene", header[number+1],"single, Percentage", singlePropability[number],"math.exp", math.exp(float(values)), "allPropability", allPropability)
                                nextEvent = Decimal(random())                
                                #np.random.rand()
                                s = 0
                                for number, values in enumerate(c2):
                                        if (tiltarray[number]==False):
                                                s=Decimal(s)+Decimal(singlePropability[number])
                                                print("nextevent", nextEvent, " s ", s, "gene", header[number+1],"singlePropability", singlePropability[number], "allPropability", allPropability)
                                                if (nextEvent < s):
                                                        print("Event is", header[number+1])
                                                        tiltarray[number] = True
                                                        counter[number] = counter[number]+1
                                                        #plusValue(event)
                                                        for numberTwo, values in enumerate(c2):
                                                                if (numberTwo != number):
                                                                        print("gene mutated", header[number+1], "gene influenced", header[numberTwo+1], "workingvalue before", c2[numberTwo], "changevalue", float(matrix[numberTwo][number+1]), "tilt", tiltarray[numberTwo], "counter", counter[numberTwo]) 
                                                                        c2[numberTwo] = Decimal(c2[numberTwo])+Decimal(matrix[numberTwo][number+1]) #Decimal(c2[numberTwo])+Decimal(matrix[numberTwo][number+1])
                                                        allPropability = 0
                                                        for number, values in enumerate(c2):
                                                                if (tiltarray[number]==False):
                                                                         allPropability = Decimal(allPropability) + Decimal(math.exp(Decimal((values))))
                                                        print ("allPropability: ", allPropability)
                                                        r = random()
                                                        r1 = Decimal(r)
                                                        if (allPropability!=0):
                                                                randomSpecifiedTime = Decimal(-1* Decimal(math.log(r1))/Decimal(allPropability))
                                                                T = Decimal(T)+Decimal(randomSpecifiedTime)
                                                        break
                        if (allPropability==0):
                                print("all mutated")
                                T=RandomTimePeriod+0.01 
                c2 =  {}
                c2 = c1.copy()
                tiltarray = {}
                #Time
                T = 0
                for number, values in enumerate(c2):
                        tiltarray[number] = False
                x=x+1
                print("--------------------x", x)
        for number, values in enumerate(c2):
              outputStr = outputStr+str(counter[number])+","
              print ("outputStr", outputStr)
        outputStr = outputStr+"\n";
        y=y+1
        x=0
        print("---------------------------------------------------------y", y)
text_file = open("TestSet2_python_10000.csv", "w")

#write string to file
text_file.write(outputStr)
 
#close file
text_file.close()


for number, values in enumerate(c2):
        print("Gene"+header[number+1]+"Counter", counter[number])
        
