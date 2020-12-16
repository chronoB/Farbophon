function getConfiguration() {
    let identifierIndex = 0
    let valueIndex = 1

    fetch("/config")
        .then((response) => response.text())
        .then((data) => {
            //split every line into a new object.
            //every line of the config file is a new config object
            let lines = data.split("\r\n")
            lines.forEach((line) => {
                //split the configuration in two parts
                //identifier=value
                let parts = line.split("=")
                //save the configuration in the sessionStorage
                sessionStorage.setItem(
                    parts[identifierIndex],
                    parts[valueIndex]
                )
            })
        })
}
