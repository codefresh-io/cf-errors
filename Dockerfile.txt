FROM codefresh/buildpacks:all-5

COPY package.json /cf-api/package.json
WORKDIR /cf-errors
RUN npm install
COPY . /cf-errors
