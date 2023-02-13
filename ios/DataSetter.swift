//
//  dataSetter.swift
//  WakatimeStats
//
//  Created by hydromoll on 10.02.2023.
//

import Foundation

private let widgetGroupId = "group.com.hydromoll.wakatime"

struct Car:Codable {
    var make : String
    var model : String
    var owner : String
}


@objc(DataSetter)

class DataSetter:NSObject {
  let shaderDefaults = UserDefaults.init(suiteName: widgetGroupId)
  override init(){
//    self.carData = try! JSONEncoder().encode(car)
    self.model = shaderDefaults?.string(forKey: "Agee") ?? "Hello"
  }
  
  var model:Any;
  
  var car = Car(make: "Chevy", model: "Volt", owner: "Vladislav")
  
//  let carData:Any;
  
  let age = 300
  
  
  
  @objc
  private func setData(_ age:String) -> Void {
    if shaderDefaults != nil{
      shaderDefaults!.set(age, forKey: "Agee")
    }
    
  }
  @objc
  private func getData() -> Int{
    let encodedData = shaderDefaults?.string(forKey: "Age")
    let decoder = JSONDecoder()
    if encodedData != nil{
      return 25
    }
    return 40
  }
  @objc
  func constantsToExport() ->[AnyHashable:Any]{
    return ["model": shaderDefaults?.string(forKey: "Agee") ?? "100"]
  }
}
