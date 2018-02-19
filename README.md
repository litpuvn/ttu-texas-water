# ttu-texas-water
West texas water <br />

## How to Clone from the repository in Github  <br />

1)Copy the web url of the repository in the Github.  <br />
2)Open Command line tool( i,e Terminal in Mac ) and choose a destination path by accessing it there.
3)Then type "git clone -copied web url-" without quotes or the dash marks and then hit enter.  <br />

## How to make modification to the existing code in Github via command line tool<br />

1) After cloning using the command line tool and after making necessary changes to the code in the repository that is cloned, we have to add the file to the local repository.  <br />
2) This is done using command called, " git add . " without the quotes.  <br />
3) Then commit the files that have been added to the local repository by entering, " git commit -m "First commit" " without the quotes.  <br />
4) Add the URL for the remote repository where your local repository will be pushed using "git remote add -origin remote repository URL- " command.  <br />
5)Push the changes in your local repository to GitHub using " git push -u origin master ".  <br />
6) By the 5th step, We will have made changes directly to the master branch using the command line tool.  <br />



## Preferable method to run the .html files:  <br />
 ### Use of "Live-server"  <br />
 
 1) Open a command line tool and type " sudo npm install -g live-server " without the quotes to run the command as an administrator.  <br />
 2) This will install npm live-server along with node modules.  <br />
 3) Go to your local repository directory and type " live server ". Now every change we make to the code in the local repository will be seen in the desired web browser at real time.<br />

#### LIVE DEMO

https://litpuvn.github.io/ttu-texas-water/

### News Data ###

RSS

http://moderator.droughtreporter.unl.edu/RSSfeed/ImpactView


Example

http://moderator.droughtreporter.unl.edu/RSSfeed/ImpactView/44187

