import os
from subprocess import call

"""
color!
from colorama import init, Fore, Back, Style

init()
print(Fore.RED + 'some red text')
print(Back.GREEN + 'and with a green background')
"""

print "Let's deploy public.ink"

"""
Note some paths
"""
script_dir = os.getcwd()

client_dir = os.path.join(script_dir, 'client/angular')
client_dist = os.path.join(script_dir, 'client/angular/dist')

server_dir = os.path.join(script_dir, 'server/appengine')
server_dist = os.path.join(script_dir, 'server/appengine/angular')

"""
Step 1: Make a frontend-build
"""
print "step 1: make an angular build"
os.chdir(client_dir) 
os.system('ng build --prod')
print "step 1 completed."

"""
Step 2: clear appengine/angular/*
"""
print "step 2: clear target directory"
cmd = "rm -r {}/*".format(server_dist)
os.system(cmd)
print "print step 2 completed"

"""
Step 3: copy dist file over
"""
print "step 3: copying files to target directory"
cmd  = "cp -r {}/* {}".format(client_dist, server_dist)
os.system(cmd)
print "step 3 completed"
print "from {} to {}".format(client_dist, server_dist)

"""
Step 4: re-write index.html
"""
print "step 4: re-writing index.html"
f = open(server_dist + '/index.html','r')
filedata = f.read()
f.close()

newdata = filedata.replace('src="','src="angular/').replace('<link href="', '<link href="angular/')

f = open(server_dist + '/index.html','w')
f.write(newdata)
f.close()
print "step 4 completed"

"""
Last Step: upload to app engine
"""
print "last step: deploy to app engine"
os.chdir(server_dir) 
cmd = "gcloud app deploy --quiet"
os.system(cmd)
print """
And you're live! Nicly don!

Check out https://public.ink to view your work!

"""
