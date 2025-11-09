echo "Build script"

npm ci
npm run build:all

# this file needs execute permissions (https://fullstackopen.com/en/part11/deployment#exercises-11-10-11-12-render)
# to see permissions, execute in the folder:
# ls -l
# to change permissions:
# chmod 755 build_step.sh
# to check changed permissions:
# ls -l
