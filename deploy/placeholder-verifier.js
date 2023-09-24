const hre = require('hardhat')

module.exports = async function() {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const { deployer } = await getNamedAccounts();

    let libs = [
        "ProofVerifier",
    ]

    let deployedLib = {}
    for (let lib of libs){
        await deploy(lib, {
            from: deployer,
            log: true,
        });
        deployedLib[lib] = (await hre.deployments.get(lib)).address
    }

    await deploy('PlaceholderVerifier', {
        from: deployer,
        libraries : deployedLib,
        log : true,
    })
}

module.exports.tags = ['placeholderVerifierFixture']
