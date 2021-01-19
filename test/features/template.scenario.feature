Feature: als-consent-oracle server

Scenario: Health Check
  Given als-consent-oracle server
  When I get 'Health Check' response
  Then The status should be 'OK'

Scenario: Hello
  Given als-consent-oracle server
  When I get 'Hello' response
  Then I see 'Hello world'
