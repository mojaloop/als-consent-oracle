Feature: als-consent-oracle server

Scenario: Health Check
  Given als-consent-oracle server
  When I get 'Health Check' response
  Then The status should be 'OK'
