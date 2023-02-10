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
    self.model = shaderDefaults?.integer(forKey: "Agee") ?? 100
  }
  
  var model:Any;
  
  var car = Car(make: "Chevy", model: "Volt", owner: "Vladislav")
  
//  let carData:Any;
  
  let age = 300
  
  
  
  @objc
  private func setData() -> Void {
    if shaderDefaults != nil{
      shaderDefaults!.set(120, forKey: "Agee")
    }
    
  }
  @objc
  private func getData() -> Int{
    let encodedData = shaderDefaults?.integer(forKey: "Age")
    let decoder = JSONDecoder()
    if encodedData != nil{
      return 25
    }
    return 40
  }
  @objc
  func constantsToExport() ->[AnyHashable:Any]{
    return ["model": shaderDefaults?.integer(forKey: "Agee") ?? 100]
  }
}
