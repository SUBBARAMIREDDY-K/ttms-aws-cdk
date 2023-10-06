import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { readFileSync } from 'fs';

export class WebserverInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const demoVPC = new ec2.Vpc(this, 'demoVPC', {
      vpcName: 'demoVPC',
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways:0,
    });
    
    //Security Group

    const demoSG = new ec2.SecurityGroup(this,'demoSG',{
      vpc: demoVPC,
      securityGroupName: 'Allow http traffic',
      allowAllOutbound:true,
    })
    // Ingress for SG
    demoSG.addIngressRule(ec2.Peer.anyIpv4(),ec2.Port.tcp(80),'allow http traffic')
    demoSG.addIngressRule(ec2.Peer.anyIpv4(),ec2.Port.tcp(22),'allow SSH')

    const userData = readFileSync('./lib/userdata.sh','utf8');
    //Ec2 Instance
    const demoEC2 = new ec2.Instance(this,'demoEc2',{
      vpc:demoVPC,
      vpcSubnets: { subnetType:ec2.SubnetType.PUBLIC},
      securityGroup: demoSG,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2,ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      keyName: 'ttms-key',
    })
    demoEC2.addUserData(userData);

  }
}
