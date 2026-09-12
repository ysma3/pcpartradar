# PCPartRadar - Microservice-based Price Comparator

This project aims to gain hands-on experience with multiple DevOps tools through a concrete project.

## V1 - Deployment of the MVP

- [x] Develop and package **productservice (API)** and **scraperservice**
- [x] Set up an automatic build pipeline with Github Actions
- [x] Configure the AWS VPC
- [x] Deploy an EC2 instance and install a single-node K3s cluster
- [x] Assign an Elastic IP and configure Security Group on the instance
- [x] Deploy the API using a Deployment
- [x] Configure a Service and an Ingress with Traefik to expose the API
- [x] Use a domain name managed through Cloudflare
- [x] Schedule product scraping using a CronJob
- [x] Enable HTTPS with Traefik and cert-manager
- [ ] Develop a minimal frontend deployed with S3 and CloudFront